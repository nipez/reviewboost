export function draftReviewReply(input: {
  author: string;
  rating: number;
  text: string;
  businessName: string;
}): string {
  const first = input.author.split(" ")[0] || "there";
  const mention = input.text.toLowerCase();

  if (input.rating >= 5) {
    return `Thank you so much, ${first}! We're thrilled you had a wonderful experience at ${input.businessName}. Our team works hard to make every visit special — we look forward to seeing you again.`;
  }
  if (input.rating === 4) {
    return `Thanks for the kind review, ${first}! We're glad you enjoyed ${input.businessName}. If there's anything we can do to make the next visit a 5-star one, just let us know.`;
  }
  if (input.rating === 3) {
    const wait = mention.includes("wait") ? " We're actively working on wait times and scheduling." : "";
    return `Thank you for the honest feedback, ${first}. We're sorry it wasn't a 5-star visit.${wait} We'd love the chance to do better next time.`;
  }
  const billing = mention.includes("bill") ? " Our office manager will reach out about the billing issue." : "";
  return `Thank you for letting us know, ${first}. We sincerely apologize for the experience at ${input.businessName}.${billing} We want to make this right — please contact us so we can follow up directly.`;
}
