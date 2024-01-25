import prisma from "../utils/prisma";

export const slugify = async (string, num = 0) => {
  let newSlug = string
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/[ ]+/g, "-");
  newSlug = num > 0 ? `${newSlug}-` + num : newSlug;

  const user = await prisma.user.findUnique({
    where: {
      slug: newSlug,
    },
  });

  if (user) {
    return slugify(string, num + 1);
  } else {
    return newSlug;
  }
};

// slugify template
export const slugifyTemplate = async (string, num = 0) => {
  let newSlug = string
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/[ ]+/g, "-");
  newSlug = num > 0 ? `${newSlug}-` + num : newSlug;

  const template = await prisma.template.findUnique({
    where: {
      slug: newSlug,
    },
  });

  if (template) {
    return slugifyTemplate(string, num + 1);
  } else {
    return newSlug;
  }
};
