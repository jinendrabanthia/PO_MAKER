"use server"
import { prisma } from "@/lib/prisma"

export async function getTemplates() {
  return await prisma.companyTemplate.findMany({
    orderBy: { templateName: "asc" }
  })
}
