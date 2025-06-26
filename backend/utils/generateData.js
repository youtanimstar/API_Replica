const { faker } = require("@faker-js/faker");

const generateData = (format, type) => {
  let data = JSON.stringify({
    "message": "No data provided",
  });

  if (type === 1) {
    data = JSON.stringify(format);
  } else if (type == 2) {
    const { size, formatData } = format;
    // console.log('format:', formatData);
    
    if (size && formatData) {
      const generatedData = [];
      for (let i = 0; i < size; i++) {
        const item = {};

        for (const key in formatData) {
            if (Object.hasOwnProperty.call(formatData, key)) {
                const value = formatData[key];
                 getFakerValue(value,key,item);
                
            }
        }
        
        generatedData.push(item);
      }
      data = JSON.stringify(generatedData);
    } else {
      data = JSON.stringify({ error: "Invalid format provided" });
    }
  }

  return data;
};

const getFakerValue = (value, key,item) => {
    switch (value) {
                  // Airline
                  case "aircraftType": item[key] = faker.airline.aircraftType(); break;
                  case "airline": item[key] = faker.airline.airline(); break;
                  case "airplane": item[key] = faker.airline.airplane(); break;
                  case "airport": item[key] = faker.airline.airport(); break;
                  case "flightNumber": item[key] = faker.airline.flightNumber(); break;
                  case "recordLocator": item[key] = faker.airline.recordLocator(); break;
                  case "seat": item[key] = faker.airline.seat(); break;
                  // Animal
                  case "bear": item[key] = faker.animal.bear(); break;
                  case "bird": item[key] = faker.animal.bird(); break;
                  case "cat": item[key] = faker.animal.cat(); break;
                  case "cetacean": item[key] = faker.animal.cetacean(); break;
                  case "cow": item[key] = faker.animal.cow(); break;
                  case "crocodilia": item[key] = faker.animal.crocodilia(); break;
                  case "dog": item[key] = faker.animal.dog(); break;
                  case "fish": item[key] = faker.animal.fish(); break;
                  case "horse": item[key] = faker.animal.horse(); break;
                  case "insect": item[key] = faker.animal.insect(); break;
                  case "lion": item[key] = faker.animal.lion(); break;
                  case "petName": item[key] = faker.animal.petName(); break;
                  case "rabbit": item[key] = faker.animal.rabbit(); break;
                  case "rodent": item[key] = faker.animal.rodent(); break;
                  case "snake": item[key] = faker.animal.snake(); break;
                  case "animalType": case "type": item[key] = faker.animal.type(); break;
                  // Book
                  case "author": item[key] = faker.book.author(); break;
                  case "bookFormat": case "format": item[key] = faker.book.format(); break;
                  case "genre": item[key] = faker.book.genre(); break;
                  case "publisher": item[key] = faker.book.publisher(); break;
                  case "series": item[key] = faker.book.series(); break;
                  case "title": item[key] = faker.book.title(); break;
                  // Color
                  case "cmyk": item[key] = faker.color.cmyk(); break;
                  case "colorByCSSColorSpace": item[key] = faker.color.colorByCSSColorSpace(); break;
                  case "cssSupportedFunction": item[key] = faker.color.cssSupportedFunction(); break;
                  case "cssSupportedSpace": item[key] = faker.color.cssSupportedSpace(); break;
                  case "hsl": item[key] = faker.color.hsl(); break;
                  case "human": item[key] = faker.color.human(); break;
                  case "hwb": item[key] = faker.color.hwb(); break;
                  case "lab": item[key] = faker.color.lab(); break;
                  case "lch": item[key] = faker.color.lch(); break;
                  case "rgb": item[key] = faker.color.rgb(); break;
                  case "colorSpace": case "space": item[key] = faker.color.space(); break;
                  // Commerce
                  case "department": item[key] = faker.commerce.department(); break;
                  case "isbn": item[key] = faker.commerce.isbn(); break;
                  case "price": item[key] = faker.commerce.price(); break;
                  case "product": item[key] = faker.commerce.product(); break;
                  case "productAdjective": item[key] = faker.commerce.productAdjective(); break;
                  case "productDescription": item[key] = faker.commerce.productDescription(); break;
                  case "productMaterial": item[key] = faker.commerce.productMaterial(); break;
                  case "productName": item[key] = faker.commerce.productName(); break;
                  // Company
                  case "buzzAdjective": item[key] = faker.company.buzzAdjective(); break;
                  case "buzzNoun": item[key] = faker.company.buzzNoun(); break;
                  case "buzzPhrase": item[key] = faker.company.buzzPhrase(); break;
                  case "buzzVerb": item[key] = faker.company.buzzVerb(); break;
                  case "catchPhrase": item[key] = faker.company.catchPhrase(); break;
                  case "catchPhraseAdjective": item[key] = faker.company.catchPhraseAdjective(); break;
                  case "catchPhraseDescriptor": item[key] = faker.company.catchPhraseDescriptor(); break;
                  case "catchPhraseNoun": item[key] = faker.company.catchPhraseNoun(); break;
                  case "companyName": case "name": item[key] = faker.company.name(); break;
                  // Database
                  case "collation": item[key] = faker.database.collation(); break;
                  case "column": item[key] = faker.database.column(); break;
                  case "engine": item[key] = faker.database.engine(); break;
                  case "mongodbObjectId": item[key] = faker.database.mongodbObjectId(); break;
                  case "dbType": case "type": item[key] = faker.database.type(); break;
                  // Datatype
                  case "boolean": item[key] = faker.datatype.boolean(); break;
                  // Date
                  case "anytime": item[key] = faker.date.anytime(); break;
                  case "between": item[key] = faker.date.between(); break;
                  case "betweens": item[key] = faker.date.betweens(); break;
                  case "birthdate": item[key] = faker.date.birthdate(); break;
                  case "future": item[key] = faker.date.future(); break;
                  case "month": item[key] = faker.date.month(); break;
                  case "past": item[key] = faker.date.past(); break;
                  case "recent": item[key] = faker.date.recent(); break;
                  case "soon": item[key] = faker.date.soon(); break;
                  case "dateTimeZone": case "timeZone": item[key] = faker.date.timeZone(); break;
                  case "weekday": item[key] = faker.date.weekday(); break;
                  // Finance
                  case "accountName": item[key] = faker.finance.accountName(); break;
                  case "accountNumber": item[key] = faker.finance.accountNumber(); break;
                  case "amount": item[key] = faker.finance.amount(); break;
                  case "bic": item[key] = faker.finance.bic(); break;
                  case "bitcoinAddress": item[key] = faker.finance.bitcoinAddress(); break;
                  case "creditCardCVV": item[key] = faker.finance.creditCardCVV(); break;
                  case "creditCardIssuer": item[key] = faker.finance.creditCardIssuer(); break;
                  case "creditCardNumber": item[key] = faker.finance.creditCardNumber(); break;
                  case "currency": item[key] = faker.finance.currency(); break;
                  case "currencyCode": item[key] = faker.finance.currencyCode(); break;
                  case "currencyName": item[key] = faker.finance.currencyName(); break;
                  case "currencyNumericCode": item[key] = faker.finance.currencyNumericCode(); break;
                  case "currencySymbol": item[key] = faker.finance.currencySymbol(); break;
                  case "ethereumAddress": item[key] = faker.finance.ethereumAddress(); break;
                  case "iban": item[key] = faker.finance.iban(); break;
                  case "litecoinAddress": item[key] = faker.finance.litecoinAddress(); break;
                  case "maskedNumber": item[key] = faker.finance.maskedNumber(); break;
                  case "pin": item[key] = faker.finance.pin(); break;
                  case "routingNumber": item[key] = faker.finance.routingNumber(); break;
                  case "transactionDescription": item[key] = faker.finance.transactionDescription(); break;
                  case "transactionType": item[key] = faker.finance.transactionType(); break;
                  // Food
                  case "foodAdjective": case "adjective": item[key] = faker.food.adjective(); break;
                  case "foodDescription": case "description": item[key] = faker.food.description(); break;
                  case "dish": item[key] = faker.food.dish(); break;
                  case "ethnicCategory": item[key] = faker.food.ethnicCategory(); break;
                  case "fruit": item[key] = faker.food.fruit(); break;
                  case "ingredient": item[key] = faker.food.ingredient(); break;
                  case "meat": item[key] = faker.food.meat(); break;
                  case "spice": item[key] = faker.food.spice(); break;
                  case "vegetable": item[key] = faker.food.vegetable(); break;
                  // Git
                  case "branch": item[key] = faker.git.branch(); break;
                  case "commitDate": item[key] = faker.git.commitDate(); break;
                  case "commitEntry": item[key] = faker.git.commitEntry(); break;
                  case "commitMessage": item[key] = faker.git.commitMessage(); break;
                  case "commitSha": item[key] = faker.git.commitSha(); break;
                  // Hacker
                  case "abbreviation": item[key] = faker.hacker.abbreviation(); break;
                  case "hackerAdjective": item[key] = faker.hacker.adjective(); break;
                  case "ingverb": item[key] = faker.hacker.ingverb(); break;
                  case "hackerNoun": item[key] = faker.hacker.noun(); break;
                  case "phrase": item[key] = faker.hacker.phrase(); break;
                  case "hackerVerb": item[key] = faker.hacker.verb(); break;
                  // Helpers (not data, but can be used for randomization)
                  // Image
                  case "avatar": item[key] = faker.image.avatar(); break;
                  case "avatarGitHub": item[key] = faker.image.avatarGitHub(); break;
                  case "avatarLegacy": item[key] = faker.image.avatarLegacy(); break;
                  case "dataUri": item[key] = faker.image.dataUri(); break;
                  case "personPortrait": item[key] = faker.image.personPortrait(); break;
                  case "imageUrl": case "url": item[key] = faker.image.url(); break;
                  case "urlLoremFlickr": item[key] = faker.image.urlLoremFlickr(); break;
                  case "urlPicsumPhotos": item[key] = faker.image.urlPicsumPhotos(); break;
                  case "urlPlaceholder": item[key] = faker.image.urlPlaceholder(); break;
                  // Internet
                  case "internetColor": case "color": item[key] = faker.internet.color(); break;
                  case "displayName": item[key] = faker.internet.displayName(); break;
                  case "domainName": item[key] = faker.internet.domainName(); break;
                  case "domainSuffix": item[key] = faker.internet.domainSuffix(); break;
                  case "domainWord": item[key] = faker.internet.domainWord(); break;
                  case "email": item[key] = faker.internet.email(); break;
                  case "emoji": item[key] = faker.internet.emoji(); break;
                  case "exampleEmail": item[key] = faker.internet.exampleEmail(); break;
                  case "httpMethod": item[key] = faker.internet.httpMethod(); break;
                  case "httpStatusCode": item[key] = faker.internet.httpStatusCode(); break;
                  case "ip": item[key] = faker.internet.ip(); break;
                  case "ipv4": item[key] = faker.internet.ipv4(); break;
                  case "ipv6": item[key] = faker.internet.ipv6(); break;
                  case "jwt": item[key] = faker.internet.jwt(); break;
                  case "jwtAlgorithm": item[key] = faker.internet.jwtAlgorithm(); break;
                  case "mac": item[key] = faker.internet.mac(); break;
                  case "password": item[key] = faker.internet.password(); break;
                  case "port": item[key] = faker.internet.port(); break;
                  case "protocol": item[key] = faker.internet.protocol(); break;
                  case "userAgent": item[key] = faker.internet.userAgent(); break;
                  case "username": case "userName": item[key] = faker.internet.userName(); break;
                  // Location
                  case "buildingNumber": item[key] = faker.location.buildingNumber(); break;
                  case "cardinalDirection": item[key] = faker.location.cardinalDirection(); break;
                  case "city": item[key] = faker.location.city(); break;
                  case "continent": item[key] = faker.location.continent(); break;
                  case "country": item[key] = faker.location.country(); break;
                  case "countryCode": item[key] = faker.location.countryCode(); break;
                  case "county": item[key] = faker.location.county(); break;
                  case "direction": item[key] = faker.location.direction(); break;
                  case "language": item[key] = faker.location.language(); break;
                  case "latitude": item[key] = faker.location.latitude(); break;
                  case "longitude": item[key] = faker.location.longitude(); break;
                  case "nearbyGPSCoordinate": item[key] = faker.location.nearbyGPSCoordinate(); break;
                  case "ordinalDirection": item[key] = faker.location.ordinalDirection(); break;
                  case "secondaryAddress": item[key] = faker.location.secondaryAddress(); break;
                  case "state": item[key] = faker.location.state(); break;
                  case "street": item[key] = faker.location.street(); break;
                  case "streetAddress": item[key] = faker.location.streetAddress(); break;
                  case "locationTimeZone": case "timeZone": item[key] = faker.location.timeZone(); break;
                  case "zipCode": item[key] = faker.location.zipCode(); break;
                  // Lorem
                  case "lines": item[key] = faker.lorem.lines(); break;
                  case "paragraph": item[key] = faker.lorem.paragraph(); break;
                  case "paragraphs": item[key] = faker.lorem.paragraphs(); break;
                  case "sentence": item[key] = faker.lorem.sentence(); break;
                  case "sentences": item[key] = faker.lorem.sentences(); break;
                  case "slug": item[key] = faker.lorem.slug(); break;
                  case "text": item[key] = faker.lorem.text(); break;
                  case "word": item[key] = faker.lorem.word(); break;
                  case "words": item[key] = faker.lorem.words(); break;
                  // Music
                  case "album": item[key] = faker.music.album(); break;
                  case "artist": item[key] = faker.music.artist(); break;
                  case "musicGenre": case "genre": item[key] = faker.music.genre(); break;
                  case "songName": item[key] = faker.music.songName(); break;
                  // Number
                  case "bigInt": item[key] = faker.number.bigInt(); break;
                  case "binary": item[key] = faker.number.binary(); break;
                  case "float": item[key] = faker.number.float(); break;
                  case "hex": item[key] = faker.number.hex(); break;
                  case "int": item[key] = faker.number.int(); break;
                  case "octal": item[key] = faker.number.octal(); break;
                  case "romanNumeral": item[key] = faker.number.romanNumeral(); break;
                  // Person
                  case "bio": item[key] = faker.person.bio(); break;
                  case "firstName": item[key] = faker.person.firstName(); break;
                  case "fullName": item[key] = faker.person.fullName(); break;
                  case "gender": item[key] = faker.person.gender(); break;
                  case "jobArea": item[key] = faker.person.jobArea(); break;
                  case "jobDescriptor": item[key] = faker.person.jobDescriptor(); break;
                  case "jobTitle": item[key] = faker.person.jobTitle(); break;
                  case "jobType": item[key] = faker.person.jobType(); break;
                  case "lastName": item[key] = faker.person.lastName(); break;
                  case "middleName": item[key] = faker.person.middleName(); break;
                  case "prefix": item[key] = faker.person.prefix(); break;
                  case "sex": item[key] = faker.person.sex(); break;
                  case "sexType": item[key] = faker.person.sexType(); break;
                  case "suffix": item[key] = faker.person.suffix(); break;
                  case "zodiacSign": item[key] = faker.person.zodiacSign(); break;
                  // Phone
                  case "imei": item[key] = faker.phone.imei(); break;
                  case "phoneNumber": case "number": item[key] = faker.phone.number(); break;
                  // Science
                  case "chemicalElement": item[key] = faker.science.chemicalElement(); break;
                  case "unit": item[key] = faker.science.unit(); break;
                  // String
                  case "alpha": item[key] = faker.string.alpha(); break;
                  case "alphanumeric": item[key] = faker.string.alphanumeric(); break;
                  case "stringBinary": item[key] = faker.string.binary(); break;
                  case "fromCharacters": item[key] = faker.string.fromCharacters(); break;
                  case "hexadecimal": item[key] = faker.string.hexadecimal(); break;
                  case "nanoid": item[key] = faker.string.nanoid(); break;
                  case "numeric": item[key] = faker.string.numeric(); break;
                  case "stringOctal": item[key] = faker.string.octal(); break;
                  case "sample": item[key] = faker.string.sample(); break;
                  case "symbol": item[key] = faker.string.symbol(); break;
                  case "ulid": item[key] = faker.string.ulid(); break;
                  case "uuid": item[key] = faker.string.uuid(); break;
                  // System
                  case "commonFileExt": item[key] = faker.system.commonFileExt(); break;
                  case "commonFileName": item[key] = faker.system.commonFileName(); break;
                  case "commonFileType": item[key] = faker.system.commonFileType(); break;
                  case "cron": item[key] = faker.system.cron(); break;
                  case "directoryPath": item[key] = faker.system.directoryPath(); break;
                  case "fileExt": item[key] = faker.system.fileExt(); break;
                  case "fileName": item[key] = faker.system.fileName(); break;
                  case "filePath": item[key] = faker.system.filePath(); break;
                  case "fileType": item[key] = faker.system.fileType(); break;
                  case "mimeType": item[key] = faker.system.mimeType(); break;
                  case "networkInterface": item[key] = faker.system.networkInterface(); break;
                  case "semver": item[key] = faker.system.semver(); break;
                  // Vehicle
                  case "bicycle": item[key] = faker.vehicle.bicycle(); break;
                  case "vehicleColor": case "color": item[key] = faker.vehicle.color(); break;
                  case "fuel": item[key] = faker.vehicle.fuel(); break;
                  case "manufacturer": item[key] = faker.vehicle.manufacturer(); break;
                  case "model": item[key] = faker.vehicle.model(); break;
                  case "vehicleType": case "type": item[key] = faker.vehicle.type(); break;
                  case "vehicle": item[key] = faker.vehicle.vehicle(); break;
                  case "vin": item[key] = faker.vehicle.vin(); break;
                  case "vrm": item[key] = faker.vehicle.vrm(); break;
                  // Word
                  case "wordAdjective": item[key] = faker.word.adjective(); break;
                  case "adverb": item[key] = faker.word.adverb(); break;
                  case "conjunction": item[key] = faker.word.conjunction(); break;
                  case "interjection": item[key] = faker.word.interjection(); break;
                  case "wordNoun": item[key] = faker.word.noun(); break;
                  case "preposition": item[key] = faker.word.preposition(); break;
                  case "wordSample": item[key] = faker.word.sample(); break;
                  case "wordVerb": item[key] = faker.word.verb(); break;
                  case "words": item[key] = faker.word.words(); break;
                  // Legacy support for your original fields
                  case "name": item[key] = faker.person.fullName(); break;
                  case "address": item[key] = faker.location.streetAddress(); break;
                  case "company": item[key] = faker.company.name(); break;
                  case "date": item[key] = faker.date.past().toISOString().split('T')[0]; break;
                  case "phone": item[key] = faker.phone.number(); break;
                  default: item[key] = faker.lorem.word(); break;
                }
    return item[key];
};
module.exports = {
  generateData,
};
