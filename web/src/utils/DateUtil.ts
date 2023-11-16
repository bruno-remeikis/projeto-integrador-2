function fillWithZeros(n: number, size: number): string {
   const nStr = new String(n);
   let filled: string = '';
   for(let i = 0; i < size - nStr.length; i++)
      filled += '0';
   return filled + nStr;
}

/**
 * Retorna uma data no formato 'dd/mm/yyyy às hh:mm'
 * @param dt Expected: Date | string
 * @returns 
 */
export function formatDate(dt: any): string
{
   if(!dt)
      return '';

   try {
      dt = new Date(dt);

      return (
         fillWithZeros(dt.getDate(), 2) + '/' +
         fillWithZeros(dt.getMonth(), 2) + (
            dt.getFullYear() === new Date().getFullYear() ? ('/' + dt.getFullYear()) : ''
         ) + ' às ' +
         fillWithZeros(dt.getHours(), 2) + ':' +
         fillWithZeros(dt.getMinutes(), 2)
      );

      /*return dt.toLocaleDateString('pt-BR', {
         day: 'numeric',
         month: 'long',
         year: 2023 === new Date().getFullYear()
            ? undefined : 'numeric',
         
         hour: '2-digit',
         minute: '2-digit'
      });*/
   }
   catch(err) {
      return '';
   }
}