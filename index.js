/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const url = 'https://pclp3skl-5129.euw.devtunnels.ms';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  async handle(handlerInput) {
    var speakOutput = '';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    var queryParams = `?userId=${userId}`;
    await getRemoteData(url + '/api/Alexa/GetUserName' + queryParams)
      .then(async (response) => {
        if (response !== '') {
          speakOutput =
            'Hola ' +
            response +
            '. ¿Qué necesitas? Recuerda que puedes pedirme que te cree una dieta o un entrenamiento para hoy.';
        } else {
          speakOutput =
            'Bienvenido. Antes de iniciar necesito conocer algunas cosas sobre tí para hacer todo mucho más preciso. Empecemos por tu nombre. ¿Cómo te llamas?';
        }
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/*--------------- Start Base --------------------------*/

const GetDietTypesIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetDietTypes'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Los tipos de dietas que existen son: carnívora, omnívora, paleo, vegana, vegetariana y mediterránea';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const GetTrainsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetTrainsTypes'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Los tipos de entrenamientos que puedes realizar son: pierna, glúteos, espalda, pecho, brazo y cardio';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/*--------------- End Base --------------------------*/

/*--------------- Start API --------------------------*/

/*--------------- Start UserData --------------------------*/

const UpdateUserNameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserName'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const name = Alexa.getSlotValue(handlerInput.requestEnvelope, 'name');
    const queryParams = `?userId=${userId}&name=${name}`;
    let speakOutput = 'This is the default message.' + name;

    postRemoteData(url + '/api/Alexa/UpdateUserName' + queryParams);
    speakOutput = `Encantado ${name}, ahora dime, ¿Cuál es tu edad?`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserAgeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserAge'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const age = Alexa.getSlotValue(handlerInput.requestEnvelope, 'age');
    const queryParams = `?userId=${userId}&age=${age}`;
    let speakOutput = 'This is the default message.' + age;

    postRemoteData(url + '/api/Alexa/UpdateUserAge' + queryParams);
    speakOutput = `Osea que tienes ${age} años, ahora necesito conocer tu peso en kilogramos.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserWeightIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserWeight'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const weight = Alexa.getSlotValue(handlerInput.requestEnvelope, 'weight');
    const queryParams = `?userId=${userId}&weight=${weight}`;
    let speakOutput = 'This is the default message.' + weight;

    postRemoteData(url + '/api/Alexa/UpdateUserWeight' + queryParams);
    speakOutput = `Ahora necesito conocer tu estatura en centimetros.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserHeightIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserHeight'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const height = Alexa.getSlotValue(handlerInput.requestEnvelope, 'height');
    const queryParams = `?userId=${userId}&height=${height}`;
    let speakOutput = 'This is the default message.' + height;

    postRemoteData(url + '/api/Alexa/UpdateUserHeight' + queryParams);
    speakOutput = `Ahora necesito conocer tu género, ¿Eres hombre o mujer?`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserGenderIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserGender'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const gender = Alexa.getSlotValue(handlerInput.requestEnvelope, 'gender');
    const queryParams = `?userId=${userId}&gender=${gender}`;
    let speakOutput = 'This is the default message.' + gender;

    postRemoteData(url + '/api/Alexa/UpdateUserGender' + queryParams);
    speakOutput = `¿Qué tipo de dieta prefieres? Puedes escoger entre carnívora, omnívora, paleo, vegana, vegetariana y mediterránea`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserDietTypeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserDietType'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const dietType = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      'dietType'
    );
    const queryParams = `?userId=${userId}&dietType=${dietType}`;
    let speakOutput = 'This is the default message.' + dietType;

    postRemoteData(url + '/api/Alexa/UpdateUserDietType' + queryParams);
    speakOutput = `Y por último, ¿qué objetivo tienes? ¿Mantenerte, ganar o perder peso?."`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserObjectiveIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'UpdateUserObjective'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const objective = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      'objective'
    );
    const queryParams = `?userId=${userId}&objective=${objective}`;
    let speakOutput = 'This is the default message.' + objective;

    postRemoteData(url + '/api/Alexa/UpdateUserMail' + queryParams);
    speakOutput = `Por último, ¿Cual es tu dirección de correo electrónico?."`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const UpdateUserMailIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'UpdateUserMail'
    );
  },

  handle(handlerInput) {
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const mail = Alexa.getSlotValue(handlerInput.requestEnvelope, 'mail');
    const queryParams = `?userId=${userId}&mail=${mail}`;
    let speakOutput = 'This is the default message.' + mail;

    postRemoteData(url + '/api/Alexa/UpdateUserObjective' + queryParams);
    speakOutput = `Muchas gracias por completar tu perfil. Ahora prueba a solicitarme tu primera dieta diaria. Puedes probarlo diciendo la frase "Generame una dieta diaria."`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/*--------------- End UserData --------------------------*/

const GetDailyDietIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetDailyDiet'
    );
  },

  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const queryParams = `?userId=${userId}`;

    await getRemoteData(url + '/api/Alexa/DailyDiet' + queryParams)
      .then((response) => {
        outputSpeech = response;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const DailyBreakfastIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'DailyBreakfast'
    );
  },

  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const queryParams = `?userId=${userId}`;

    await getRemoteData(url + '/api/Alexa/DailyBreakfast' + queryParams)
      .then((response) => {
        outputSpeech = response;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const DailyLunchIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'DailyLunch'
    );
  },

  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const queryParams = `?userId=${userId}`;

    await getRemoteData(url + '/api/Alexa/DailyLunch' + queryParams)
      .then((response) => {
        outputSpeech = response;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const DailyDinnerIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'DailyDinner'
    );
  },

  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const queryParams = `?userId=${userId}`;

    await getRemoteData(url + '/api/Alexa/DailyDinner' + queryParams)
      .then((response) => {
        outputSpeech = response;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const DailyRoutineIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetDailyRoutine'
    );
  },

  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';
    const userId = Alexa.getUserId(handlerInput.requestEnvelope);
    const exercise = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      'exercise'
    );
    const queryParams = `?userId=${userId}&exercise=${exercise}`;

    await getRemoteData(url + '/api/Alexa/DailyRoutine' + queryParams)
      .then((response) => {
        outputSpeech = response;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();
  },
};

const getRemoteData = (url) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed with status code: ${response.statusCode}`));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
  });

const postRemoteData = (url, data = {}) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const request = client.request(url, options, (response) => {});
    request.on('error', (err) => reject(err));
    request.setTimeout(10000, () => {
      reject(new Error('Request timed out'));
    });
    if (Object.keys(data).length > 0) {
      request.write(JSON.stringify(data));
    }
    request.end();
  });

/*--------------- End API --------------------------*/

/*--------------- Start Alexa --------------------------*/

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput = '¿Cómo puedo ayudarte?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speakOutput = '¡Adiós!';

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.FallbackIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Lo siento, desconozco sobre el tema. Por favor, inetntalo de nuevo.';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * 
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};*/
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      'Lo siento, he tenido problemas para resolver lo que me has pedido. Por favor, intentalo de nuevo.';
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    GetDietTypesIntentHandler,
    GetDailyDietIntentHandler,
    DailyBreakfastIntentHandler,
    DailyLunchIntentHandler,
    DailyDinnerIntentHandler,
    GetTrainsIntentHandler,
    DailyRoutineIntentHandler,
    UpdateUserNameIntentHandler,
    UpdateUserAgeIntentHandler,
    UpdateUserWeightIntentHandler,
    UpdateUserHeightIntentHandler,
    UpdateUserGenderIntentHandler,
    UpdateUserDietTypeIntentHandler,
    UpdateUserObjectiveIntentHandler,
    UpdateUserMailIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();
