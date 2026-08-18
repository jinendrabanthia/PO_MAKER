const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  await prisma.companyTemplate.create({
    data: {
      templateName: "SNK Default",
      buyerName: "SNK",
      buyerCity: "Odisha, India",
      buyerMobile: "9078000369",
      buyerRef: "Surat Dreams Aug 26",
      buyerAgency: "JM Jain",
      sellerName: "READIPRINT FASHIONS",
      sellerAddress: "42, lane # 4, kartarpura industrial area\nbais godam, jaipur, rajasthan - 302006, india",
      sellerPhone: "0141-4028090, +91-99297 79828",
      sellerEmail: "wholesale@readiprintfashions.com",
      sellerGstin: "08AAOFR2619A2ZB",
      sellerWebsite: "ws.readiprintfashions.com"
    }
  })
  console.log("Template seeded")
}
main()
