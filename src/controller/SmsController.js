const Sms = require("../model/Sms");
const keys = require("../config/keys");
const RingCentral = require("../services/RingCentral");
const CronJob = require("cron").CronJob;

const { format } = require("date-fns");

async function addToQueue(req, res) {
  let jsonResponse = [];
  try {
    for (const message of req.body.request) {
      let now = format(new Date(), "yyyy-MM-dd hh:mm:ss a");
      jsonData = message;
      jsonData.from = keys.RINGCENTRAL_USERNAME;
      jsonData.creationTime = now.toLowerCase();

      await store(jsonData)
        .then((res) => {
          jsonData._id = res._id;
        })
        .catch((error) => {
          // console.log(error);
          throw error;
        });
      jsonResponse.push(jsonData);
    }
    console.log(jsonResponse);

    setRouteRequest("store-outbound", jsonResponse);
    RingCentral.postToClient(jsonResponse);
    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function receive(jsonObj) {
  let now = format(new Date(), "yyyy-MM-dd hh:mm:ss a");
  let mongoJson = {
    topic: "Job Offer",
    to: jsonObj.body.to[0].phoneNumber,
    from: jsonObj.body.from.phoneNumber,
    type: jsonObj.body.type,
    creationTime: now.toLowerCase(),
    direction: jsonObj.body.direction,
    body: jsonObj.body.subject,
    status: "Received",
  };

  await store(mongoJson)
    .then((res) => {
      mongoJson._id = res._id;
      console.log(mongoJson);

      setRouteRequest("store-inbound", mongoJson);
      RingCentral.postToClient(mongoJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function store(jsonObj) {
  const sms = new Sms(jsonObj);
  const jsonResponse = await sms.save();
  return jsonResponse;
}

async function smsListener() {
  await RingCentral.login();

  const subscription = RingCentral.getSubscription();

  var eventFilters = [
    "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS",
  ];
  subscription
    .setEventFilters(eventFilters)
    .register()
    .then(() => {
      console.log("Waiting for text messages...");
    })
    .catch((error) => {
      console.log(error);
    });

  subscription.on(subscription.events.notification, function (msg) {
    if (msg.event.indexOf("/message-store/instant") > -1) {
      receive(msg).catch((error) => {
        console.log(error);
      });
    }
  });
}

async function smsCronJobs() {
  await RingCentral.login();

  var queuedSms = new CronJob(
    "*/65 * * * * *",
    async () => {
      var responseArr = [];
      console.log("<-- NEW CRONJOB STARTED  -->");

      queueSmsArr = await getQueuedSms();

      if (queueSmsArr) {
        for (const type of queueSmsArr) {
          console.log(" --- TYPES: OUTBOUND || OUTBOUND ANSWER ---  ");

          for (const sms of type) {
            console.log(sms);
            await RingCentral.sendMessage(sms.to, sms.body)
              .then((res) => {
                sms.status = "Sent";
              })
              .catch(async function (error) {
                const errorLog = await error.response.json();

                sms.subject = errorLog.errorCode;
                sms.status = "Error";
                sms.errorMessage = errorLog.message;
                sms.from = keys.RINGCENTRAL_USERNAME;

                console.log(sms.errorMessage);
              });

            await Sms.findOneAndUpdate({ _id: sms._id }, sms, { new: true })
              .then((response) => {
                console.log(response);
                responseArr.push(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }

        // console.log(responseArr);
        setRouteRequest("update-outbound", responseArr);
        RingCentral.postToClient(responseArr);
        console.log("---------- JOB COMPLETED -----------");
      } else {
        console.log("----- 0 MESSAGES IN QUEUE -----");
      }
    },
    null,
    true,
    "America/Los_Angeles"
  );
  queuedSms.start();
}
async function cronTest() {
  var queuedSms = new CronJob(
    "00,15,30,45 * * * *",
    async () => {
      console.log("funciona?");
    },
    null,
    true,
    "America/Los_Angeles"
  );
  queuedSms.start();
}

async function getQueuedSms() {
  var queueSmsArr = [];
  var OUTBOUNDANSWERLIMIT = 10;
  var OUTBOUNDLIMIT = 50;

  var outboundAnswer = await Sms.find({
    status: "Queued",
    direction: "Outbound Answer",
  }).limit(10);
  if (outboundAnswer.length > 0) queueSmsArr.push(outboundAnswer);

  OUTBOUNDLIMIT = OUTBOUNDLIMIT - outboundAnswer.length;

  var outbound = await Sms.find({
    status: "Queued",
    direction: "Outbound",
  }).limit(40);
  if (outbound.length > 0) queueSmsArr.push(outbound);

  return queueSmsArr.length > 0 ? queueSmsArr : false;
}

function setRouteRequest(routeName, req) {
  switch (routeName) {
    case "store-inbound":
      req.uri = keys.FRONTALLUSA_STORE_INBOUND;
      break;
    case "store-outbound":
      req.uri = keys.FRONTALLUSA_STORE_OUTBOUND;
      break;
    case "update-outbound":
      req.uri = keys.FRONTALLUSA_UPDATE_OUTBOUND;
      break;
  }
}

module.exports = { addToQueue, receive, smsListener, smsCronJobs, cronTest };
