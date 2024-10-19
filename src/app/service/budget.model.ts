export interface Budget {
    id?: string;
    NombreCliente: string;
    Telefono: string;
    Email: string;
    totalCost: number;
    servicios: {
      seo: boolean;
      ads: boolean;
      web: boolean;
  },
    numeroDePaginas: number;
    numeroDeIdiomas: number;
    fecha: string;
  }