'use server'

export type resultType= { /// Define el tipo de dato que se espera recibir del servidor
  message: string;
  result: boolean;
}

export default async function useLogin(data: string) { /// Hooks que se encarga de hacer la peticion al servidor
  /// data:string Recibe un string como parametro, que es el objeto que se va a enviar al servidor
  return new Promise<resultType>((resolve, reject) => { /// Retorna una promesa que se resuelve o se rechaza dependiendo de la respuesta del servidor
    globalThis.fetch('http://localhost:8000/api/login', { /// Hace la peticion al servidor
      method: 'POST', // Define el metodo de la peticion
      headers: {
        'Content-Type': 'application/json', // Define el tipo de contenido que se va a enviar al servidor
      },
      body: data /// Envía el objeto que se va a enviar al servidor
    })
    .then(data => data.json()) /// Trae la respuesta del servidor y la convierte a json
    .then(res => { ///// Valida si la respuesta del servidor es correcta
      resolve(res) /// Si es correcta, resuelve la promesa con el resultado
    })
    .catch(err => {
      reject(err) /// Si hay un error, rechaza la promesa con el error
    })
  })
}