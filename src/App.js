import './App.css';
import {useEffect,useState} from "react";
import { getAllPokemon,getPokemon } from './utls/pokemon';
import Start from './components/Starts/Start';
import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
function App() {

  // ローディングの状態管理用
  const [loading,setLoading]=useState(true);
  const [start,setStart]=useState(true);
  // フェッチしたポケモンデータの管理用
  const [pokemonData,setPokemonData]=useState([]);
  const [prevUrl,setPrevUrl]=useState("");
  const [nextUrl,setNextUrl]=useState("");
  const [filterVal,setFilterVal]=useState("");
  const [filterClass,setFilterClass]=useState("タイプ");

  const DoFilter=(e)=>{
    // 値更新
    setFilterVal(e.target.value);
  }

  // pokeAPI利用 (offsetをビクティニスタートになるよう指定　＆　フェッチ数のリミットを52に)
  const initialUrl="https://pokeapi.co/api/v2/pokemon?offset=493&limit=52";

  // データ取得を初期表示とリロード時に実行
  useEffect(()=>{
    const fetchAllPokemonData=async()=>{
      // 全てのポケモンデータを取得
      let res=await getAllPokemon(initialUrl);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      setPrevUrl(res.previous);
      setNextUrl(res.next);
      
      setLoading(false);
    }
    
    fetchAllPokemonData();
  },[]);

  const startAction=()=>{
    setStart(false);
  }
  
  // 各ポケモンの詳細データ取得用関数
  const loadPokemon=async(data)=>{
    let __pokemonData=await Promise.all(data.map((pokemon)=>{
      // 各ポケモンの詳細データが記述されたAPI先を取得
      let pokemonRecord=getPokemon(pokemon.url);

      // この戻り値が、 __pokemonData に入る
      return pokemonRecord;
    })); 
    
    // 得られたデータを元にステート更新
    setPokemonData(__pokemonData);
  }


  const goToPrevPage=async()=>{
    // イッシュより前のポケモンの表示を防ぐ
    if(!prevUrl | prevUrl==="https://pokeapi.co/api/v2/pokemon?offset=441&limit=52"){
      alert("前のページは存在しません。");
      return;
    }
    setLoading(true);
    let data=await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setLoading(false);
  }

  const goToNextPage=async()=>{
    // イッシュより後のポケモンの表示を防ぐ
    if(!nextUrl | nextUrl==="https://pokeapi.co/api/v2/pokemon?offset=649&limit=52"){
      alert('次のページは存在しません。');
      return;
    }
    let data=await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setPrevUrl(data.previous);
    setNextUrl(data.next);
    setLoading(false);
  }

  console.log(pokemonData);
  
  return(
    <>

      <div className='App'>
        {loading | start ? 
          (
            <Start func={startAction} />
          ) :
          (
            <>
              <Navbar />
              {/* フィルタリング実行要素 */}
              <Filter func={DoFilter}/>{filterClass}でフィルタリング 

              <div className='pokemonCardContainer'>
                {/* フィルタリングを全表示または各タイプの場合で行う。 */}
              {pokemonData
                .filter(pokemon => filterVal==="" | pokemon.types.some(type => type.type.name === filterVal))
                .map((pokemon, i) => (
                  <Card key={i} pokemon={pokemon} />
              ))}

              </div>
              <div className='btnContainer'>
                <button className='btn prev' onClick={goToPrevPage}>前へ</button>
                <button className='btn next' onClick={goToNextPage}>次へ</button>
              </div>
            </>
          )


        }
      </div>
    </>
  );
}
export default App;