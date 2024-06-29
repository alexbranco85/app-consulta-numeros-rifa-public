import Link from "next/link";

const Header = async () => {

  const urlHome = process.env.NEXT_PUBLIC_MENU_URL_HOME;
  const urlLoja = process.env.NEXT_PUBLIC_MENU_URL_LOJA;
  const urlProdutos = process.env.NEXT_PUBLIC_MENU_URL_PRODUTOS;
  const urlContato = process.env.NEXT_PUBLIC_MENU_URL_CONTATO;

  return (
    <>
      <div className="w-full flex p-1 transition-all bg-main-red"></div>
      <div className="w-full flex p-4 justify-between gap-4 items-center transition-all bg-main-blue relative">
        <div className="flex gap-4 items-center">
          <Link href="/" className="md:absolute top-4">
            <img
              src={"/logo.png"}
              alt="logo"
              className="w-20 md:w-32"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li className="text-white text-lg"><Link href={urlHome}>Home</Link></li>
            <li className="text-white text-lg hidden sm:block"><Link href={urlLoja}>Loja</Link></li>
            <li className="text-white text-lg hidden sm:block"><Link href={urlProdutos}>Nossos Produtos</Link></li>
            <li className="text-white text-lg"><Link href={urlContato}>Contato</Link></li>
          </ul>
        </div>
      </div>
    </>
  )

}

export default Header;