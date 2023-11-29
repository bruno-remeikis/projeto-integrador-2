export function firstWordOf(text: any) {
   if(!text || typeof text !== 'string')
      return "";

   return text.split(" ")[0];
}