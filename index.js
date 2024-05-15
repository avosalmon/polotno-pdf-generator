const { createInstance } = require('polotno-node');

module.exports.handler = async (event) => {
  try {
    const instance = await createInstance({
      key: 'your-api-key',
    });

    const json = JSON.parse(event.body);

    const pdfBase64 = await instance.jsonToPDFBase64(json, {
      pixelRatio: 2
    });

    instance.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        pdf: pdfBase64,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
