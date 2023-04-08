const greetings = {
  "openings": [
      {
        "patterns": [ "Hi","Hey", "Hello", "Hi there","Yo","Ho"],
        "responses": [ "Hello, thanks for visiting", "Hi there, how can I help?" ]
      }
  ],
  "closings": [
      {
        "patterns": [ "Bye", "See you later", "Goodbye" ],
        "responses": [ "See you later, thanks for visiting", "Have a nice day", "Bye! Come back again soon","Thanks for visiting"]
      }
  ],
  "thankful": [
      {
        "patterns": [ "Thanks", "Thank you", "That's helpful" ],
        "responses": [ "Happy to help! Let me know if you have any other questions or need further assistance.", 
                        "Any time! If you have any more questions or need further assistance, feel free to ask.", "My pleasure","You're welcome!"]
      }
  ]
}

const helpCommand = {
  "patterns": ["help", "help me", "need help", "need assistance","support"],
  "responses": [ 
    "Sure, I can help you!! What do you need assistance with?",
    "- Queries / Issues",
    "- frequently asked questions",
    "- Learn tutorial",
    "- About Cartoonizer",
    "- Features of Cartoonizer"
  ],
  "options": {
    "queries": {
      "pattern": ["queries", "query","issue","issues","solve my query", "a query","issue","got an issue","solve my issue","facing problem","solve my probvlem"],
      "response": ["For any type of queries/issues being faced, please visit our support page, fo further assistance."]
    },
    "about": {
      "pattern": ["about", "about chatbot","working","process","design"],
      "response": "To know more about our chatbot, you can check our website or click on the 'About', located in the panel, left-side. "
    },
    "learn": {
      "pattern": ["learn","tutorial","video guide","guide"],
      "response": "To learn how to perform tasks in the chatbot, click on 'Tutorial', situated left to the chat-area, in the panel."
    },
    "faq": {
      "pattern": ["faq", "faqs","questions","solutions"],
      "response": "To read FAQs, click on FAQ's, on the left-side of your chat-area."
    },
    "features": {
      "pattern": ["features","feature", "tasks"],
      "response": "To see different features that our chatbot provides, you can check our website or contact our customer support team."
    }
  }
}

const fillerWords = {
  "pattern": ["ok", "okay", "sure", "hmm", "hm", "k", "kk", "kkk"],
  "response": ["Let me know if you have any other questions or need further assistance. To end the chat, say 'bye'."]
}

const cartoonFilter = {
  "pattern": ["apply cartoon filter", "add cartoon effect", "cartoonize the image","cartoonify the image","cartoonize","cartoonify","cartoon my image"],
  "responses": ["Sure, I can apply a cartoon filter to your picture! Here's the updated image:"]
} //function is to be called to change filters of the image
 
const pencilSketchFilter = {
  "pattern": ["apply pencil sketch filter", "add pencil sketch effect", "convert to pencil sketch"],
  "responses": ["Sure, I can convert your picture into a pencil sketch! Here's the updated image:"]
}//function is to be called to change filters of the image

const colorFilters = {
  "pattern": ["change color filter", "change filter", "apply color filter", "apply filter", "add color filter", "add filter", "apply color effect", "apply effect", "add color effect", "add effect"],
  "responses": ["Here are some color filter options you can choose from:", 
                  "- Warm-up filters", // Add a warm, yellow/orange tint to the image, giving it a cozy and inviting feel
                  "- Cooling filters", // Add a cool, blue tint to the image, creating a sense of calmness and relaxation
                  "- Contrast filters", // Increase or decrease the contrast of the image, making it more or less vivid
                  "- Black and white filters", // Convert the image to black and white, removing all color information
                  "- Sepia filters" // Give the image a brownish, vintage look
    ],
  "choices": {
    "warmup": {
      "pattern": ["apply warmup filter", "add warmup effect", "warm up the picture", "add yellow/orange tint"],
      "responses": ["Sure, I can apply a warmup filter to your picture! Here's the updated image:"]
    },
    "cooling": {
      "pattern": ["apply cooling filter", "add cooling effect", "cool down the picture", "add blue tint"],
      "responses": ["Sure, I can apply a cooling filter to your picture! Here's the updated image:"]
    },
    "contrast": {
      "pattern": ["apply contrast filter", "add contrast effect"], // "increase contrast", "decrease contrast"
      "responses": ["Sure, I can apply a contrast filter to your picture! Here's the updated image:"]
    },
    "blackWhite": {
      "pattern": ["turn it into black and white picture", "change scale to dark shade"],
      "responses": ["Sure, I can turn your picture into a black and white image! Here's the updated picture:"]
    },
    "sepia": {
      "pattern": ["apply sepia filter", "add sepia effect"],
      "responses": ["Sure, I can apply a sepia filter to your picture! Here's the updated image:"]
    }
  }
}
  

function getBotResponse(input) {

  // remove extra white space from input
  input = input.trim(); 
  if (!input) {
    return "Please enter a question or command.";
  }

  // auto space input
  input = autoSpace(input); 
  
  //check for greetings
  const greetingResponse = getGreetingResponse(input);
  if (greetingResponse) {
    return greetingResponse;
  }

  // check for help command
  const helpResponse = getHelpResponse(input);
  if (helpResponse) {
    return helpResponse;
  }

  //  for filler words
  const fillerResponse = handleFillerWords(input);
  if (fillerResponse) {
    return fillerResponse;
  }

  // check for cartoon filter
  const cartoonResponse = applyCartoonFilter(input);
  if (cartoonResponse) {
    return cartoonResponse;
  }

  // if no patterns are matched, return a default response
  return "I'm sorry, I don't understand. Can you please rephrase or try a different question?";
}


function autoSpace(text) {

  //add space between words 
  text = text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

  //add space between words separated by other characters
  text = text.replace(/[-_]/g, ' ');

  // add space before punctuation
  text = text.replace(/([^\s])([.,!?:;])/g, "$1 $2");

  // add space after punctuation
  text = text.replace(/([.,!?:;])([^\s])/g, "$1 $2");

  // remove extra spaces
  text = text.replace(/\s+/g, " ");

  // trim leading and trailing spaces
  text = text.trim();

  return text;
}


function getGreetingResponse(input) {
  // check for opening greetings
  for (let opening of greetings.openings) {
    for (let pattern of opening.patterns) {
      if (input.toLowerCase().includes(pattern.toLowerCase())) {
        return opening.responses[Math.floor(Math.random() * opening.responses.length)];
      }
    }
  }

  // check for closing greetings
  for (let closing of greetings.closings) {
    for (let pattern of closing.patterns) {
      if (input.toLowerCase().includes(pattern.toLowerCase())) {
        return closing.responses[Math.floor(Math.random() * closing.responses.length)];
      }
    }
  }

  // check for thanks
  for (let thankful of greetings.thankful) {
    for (let pattern of thankful.patterns) {
      if (input.toLowerCase().includes(pattern.toLowerCase())) {
        return thankful.responses[Math.floor(Math.random() * thankful.responses.length)];
      }
    }
  }

  return null;
}


function getHelpResponse(input) {
  for (let pattern of helpCommand.patterns) {
    if (input.toLowerCase().includes(pattern.toLowerCase())) {
      return helpCommand.responses.join('\n');
    }
  }

  for (let optionName in helpCommand.options) {
    const option = helpCommand.options[optionName];
    for (let pattern of option.pattern) {
      if (input.toLowerCase().includes(pattern.toLowerCase())) {
        return option.response;
      }
    }
  }

  return null;
}


function handleFillerWords(input) {
  for (let pattern of fillerWords.pattern) {
    if (input.toLowerCase().includes(pattern.toLowerCase())) {
      return fillerWords.response[Math.floor(Math.random() * fillerWords.response.length)];
    }
  }
  return null;
}

function applyCartoonFilter() {
  
  // to upload image from local storage and post it to python file
  upload();

  fetch('/cartoonizer', {method: 'POST',body: formData}).then(response => 
    {
      if (!response.ok) {
        throw new Error('Failed to cartoonize image')
      }
      return response.json()
    }).then(data => {
      const imageElement = document.createElement('img')
      imageElement.src = `data:${data.type};base64,${data.image}`
      const messageArea = document.getElementById('message-area')
      messageArea.appendChild(imageElement)
    }).catch(error => {
      console.error(error)
    })
    
  return "Here's the updated image with a cartoon filter applied!";
}