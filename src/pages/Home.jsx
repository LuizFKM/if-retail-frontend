import Hero from "../components/Hero.jsx";
import Header from "../components/Header.jsx";
import {useEffect, useState} from "react";
import produtoService from "../services/produtoService.js";
import Destaques from "../components/Section.jsx";
import Footer from "../components/Footer.jsx";

function Home(){
    const [produtos, setProdutos] = useState([])

    async function listarProdutos(){
        try{
            const data = await produtoService.listarTodos()
            setProdutos(Array.isArray(data) ? data : (data.content ?? []))
        }catch(e){
            console.log(e)
            alert("Erro ao listar produtos")
        }
    }

    useEffect(()=>{
        listarProdutos()
    },[])

    console.log(produtos)
    return(
        <div>
            <Header/>
            <Hero produtos={produtos}/>
            <Destaques produtos={produtos} />
            <Footer/>

        </div>
    )
}

export default Home;