const mongoose = require("mongoose");

const Options = mongoose.model(
  "Options",
  new mongoose.Schema({
    homepage: {
      events: { type: Number, default: 3 },
      jobs: { type: Number, default: 3 },
    },
    event: {
      types: {
        type: Array,
        default: ["Bedriftspresentasjon", "Workshop", "Case", "Foredrag"],
      },
    },
    job: {
      types: { type: Array, default: ["Heltid", "Deltid", "Sommerjobb"] },
    },
    details: {
      name: { type: String, default: "Industrivinduet" },
      email: { type: String, default: "post@industrivinduet.no" },
      phone: { type: String, default: undefined },
      address: {
        type: String,
        default: "Gamle Kjemi, Gløshaugen Trondheim, Norway",
      },
      organization: { type: String, default: "996056009" },
      about: {
        type: String,
        default:
          "<p>Industrivinduet er A/F Smørekoppens bedriftskontakt. Vi jobber for å fremme kontakt mellom næringslivet og studentene ved Produktutvikling og Produksjon</p>",
      },
    },
    socials: {
      facebook: {
        name: { type: String, default: "Industrivinduet" },
        url: {
          type: String,
          default: "https://www.facebook.com/industrivinduet/",
        },
      },
      instagram: {
        name: { type: String, default: "Industrivinduet" },
        url: {
          type: String,
          default: "https://www.instagram.com/industrivinduet/",
        },
      },
      linkedin: {
        name: { type: String, default: "Industrivinduet, NTNU" },
        url: {
          type: String,
          default: "https://www.linkedin.com/company/industrivinduet-ntnu",
        },
      },
    },
  })
);

module.exports = Options;
