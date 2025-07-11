import { prisma } from "@dub/prisma";
import { DiscountSchema } from "../zod/schemas/discount";

export const determinePartnerDiscount = async ({
  partnerId,
  programId,
}: {
  partnerId: string;
  programId: string;
}) => {
  const programEnrollment = await prisma.programEnrollment.findUnique({
    where: {
      partnerId_programId: {
        partnerId,
        programId,
      },
    },
    include: {
      discount: true,
    },
  });

  if (!programEnrollment) {
    return null;
  }

  const partnerDiscount = programEnrollment.discount;

  if (!partnerDiscount) {
    return null;
  }

  return DiscountSchema.parse(partnerDiscount);
};
