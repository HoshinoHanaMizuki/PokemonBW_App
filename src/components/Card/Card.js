import "./Card.css"
import {useState,useEffect} from "react";

const Card=({pokemon})=>{

    // モーダル表示管理用
    const [showModal, setShowModal] = useState(false);
    // ポケモンの日本データ用
    const [pokemonJPName,setPokemonJPName]=useState([]);
    const [pokemonJPType, setPokemonJPType] = useState([]);
    const [pokemonJPAbility, setPokemonJPAbility] = useState([]);

    const JPDataUrl=pokemon.species.url;
    // console.log(JPDataUrl);

    // ポケモン日本語名取得用関数 （取得は成功するが、最初のページ以降名前が更新されない）
    const getJPName=async(JPDataUrl)=>{
        let fetchData=await fetch(JPDataUrl);
        let results=await fetchData.json();
        let JPName=results.names.find((name)=>{
            return name.language.name === "ja-Hrkt";
        }).name;

        setPokemonJPName(JPName);
    }


    // typesに格納されているタイプURLを１つずつ処理していく
    const getAllJPType=async()=>{
        // Promise.allを用いてmap処理をタイプ数だけ並列実行　→ その結果がJPTypeに配列として入る
        let JPType=await Promise.all(pokemon.types.map(async(type)=>{
            let url=type.type.url;
            let fetchData=await fetch(url);
            let results=await fetchData.json();
            return results.names.find((name)=>{
                return name.language.name === "ja-Hrkt";
            }).name;
        }));
        setPokemonJPType(JPType);
    }

    // abilitiesに格納されているabilityの詳細URLを１つずつ処理していく
    const getAllJPAbility=async()=>{
        // Promise.allを用いてmap処理を特性数だけ並列実行　→ その結果がJPAbilityに配列として入る
        let JPAbility=await Promise.all(pokemon.abilities.map(async(ability)=>{
            let url=ability.ability.url;
            let fetchData=await fetch(url);
            let results=await fetchData.json();
            // 隠れ特性用の表示対応のため、is_hiddenも保持
            return ([results.names.find((name)=>{
                return name.language.name === "ja-Hrkt";
            }).name,ability.is_hidden]);
        }));
        setPokemonJPAbility(JPAbility);
    }

    useEffect(()=>{
        getJPName(JPDataUrl);
        getAllJPType();
        getAllJPAbility();
    },[pokemon]);
    
    const handleClick = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return(
        <div className="card">
            <div className="cardImgContainer">
                <img src={pokemon.sprites.front_default} onClick={handleClick}/>
                <div className="hoverText">ポケモンをクリックしてステータスを見る！</div>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>X 閉じる</span>
                        <div className="statusContainer">
                            {pokemon.stats.map((stat)=><div key={stat.stat.name} className="status">{stat.stat.name+":"+stat.base_stat}</div>)}
                        </div>
                    </div>
                </div>
            )}
            <h3 className="pokemonName">{pokemon.name}</h3>
            <h3 className="pokemonJPName">{pokemonJPName}</h3>
            <div className="type">
                タイプ：{pokemon.types.map((type,i)=>{
                    return(
                        <span key={"type"+parseInt(i+1)} className={type.type.name} >{type.type.name}　</span>
                    );
                })}
                <p>
                    {pokemonJPType.map((type,i)=>{
                        return(
                            <span key={"type"+parseInt(i+1)} className={type} >{type}　</span>
                        );
                    })}
                </p>
            </div>
            <div className="特性">
                特性：{pokemon.abilities.map((ability,i)=>{
                    if(! ability.is_hidden){
                        return <span key={"特性"+parseInt(i+1)}>{ability.ability.name}　</span>;
                    }
                    else{
                        return <span key={"特性"+parseInt(i+1)}>{ability.ability.name}(sec)</span>;
                    }
                })}
                <p>
                    {pokemonJPAbility.map((ability,i)=>{
                        if(!ability[1]){
                            return(
                                <span key={"ability"+parseInt(i+1)} className={ability[0]} >{ability[0]}　</span>
                            )
                        }
                        else{
                            return(
                                <span key={"ability"+parseInt(i+1)} className={ability[0]} >{ability[0]}(隠れ)</span>
                            )   
                        }
                    })}
                </p>
            </div>
        </div>
    );
}

export default Card;