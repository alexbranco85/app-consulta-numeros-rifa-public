'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';

export default function ConsultaNumeros() {

  const [pedidos, setPedidos] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);

  const formRef = useRef(null);
  const urlHome = process.env.NEXT_PUBLIC_MENU_URL_HOME;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    let cpf = formData.get('cpf');

    if (!cpf) {
      return;
    } else {
      cpf = cpf.replaceAll('.', '').replace('-', '')
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf }),
      });

      if (!response.ok) {
        setError("Cliente não encontrado.");
        setPedidos(null);
        setCliente(null);
        throw new Error('Erro ao consultar cliente');
      }

      const data = await response.json();

      if (data.cliente) {
        const numerosPorPedido = {};

        if (!data.numeros.length) {
          setError("Nenhum número encontrado para esse cliente");
          return;
        }

        data.numeros.forEach((numero) => {
          if (!numerosPorPedido[numero.id_pedido]) {
            numerosPorPedido[numero.id_pedido] = [];
          }

          const numeroComSerie = {
            ...numero,
            numeroConcatenado: `${numero.serie}${numero.numero}`,
          };

          numerosPorPedido[numero.id_pedido].push(numeroComSerie);
        });

        setError(null);
        setPedidos(numerosPorPedido);
        setCliente(data.cliente);
      } else {
        setPedidos(null);
        setCliente(null);
      }

    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center relative pt-8 md:pt-32 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-5 mb-6">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-4 text-center ">
              <label htmlFor="number" className="text-4xl font-semibold text-black">
                Consulte os seus números
              </label>
              <p className="text-center text-base mt-4 text-black">
                Informe o seu CPF para ver os seus números
              </p>
            </div>
            <div className="flex justify-center">
              <InputMask
                mask="999.999.999-99"
                id="number"
                type="text"
                name='cpf'
                placeholder="Digite aqui seu CPF"
                required
                className="w-full block mb-2 font-medium text-gray-900 dark:text-white px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 min-w-full"
              />
            </div>
            <p><button type="submit" className="w-full bg-main-red text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center hover:bg-main-blue">Consultar</button></p>
          </form>
        </div>

        {error && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 w-full max-w-4xl mb-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-5">
              <h1 className="text-xl font-semibold mb-1 text-black">{error}</h1>
            </div>
          </div>
        )}

        {!error && pedidos && Object.keys(pedidos)
          .sort((a, b) => parseInt(b) - parseInt(a)) // Ordena os IDs em ordem decrescente
          .map((pedidoId) => (
            <div key={pedidoId} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 w-full max-w-4xl mb-4">
              {/* Restante do seu código permanece inalterado */}
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-5">
                <h1 className="text-xl font-semibold mb-1 text-black">Sorteio Fusca da Confusão</h1>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600">
                    <b>{cliente.nome}</b>
                  </p>
                  <p className="text-gray-600">
                    Número do Pedido: <b>{pedidoId}</b>
                  </p>
                  <p className="text-gray-600">Número gerados nesse Pedido: <strong>{pedidos[pedidoId].length}</strong></p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pedidos[pedidoId].map((pedido) => (
                      <p key={pedido.id_numero} className="bg-main-blue rounded-md text-white px-2">
                        {pedido.numeroConcatenado}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col md:flex-row mt-24">
        <div className="w-full md:w-1/2 h-60 md:h-auto bg-gray-200 flex flex-col items-center justify-center py-40 px-10 gap-8 bg-main-red">
          <h1 className="text-center text-white text-xl font-bold leading-tight tracking-tight text-3xl md:text-5xl dark:text-white">Concorra ao<br />Fusca da Confusão</h1>
          <p><Link href={urlHome}><button className="bg-main-blue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center hover:bg-main-blue">Clique aqui</button></Link></p>
        </div>
        <div className="w-full md:w-1/2 h-60 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('/fusca-porta-aberta.jpeg')" }}></div>
      </div>

    </>
  );
}
