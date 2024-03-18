const Filter=({func})=>{
    // フィルターの値
    const pokemonTypes_JP=["","あく","いわ","エスパー","かくとう","くさ","こおり","ゴースト","じめん","でんき","どく","ドラゴン","ノーマル","はがね","ひこう","フェアリー","ほのお","みず","むし"];
    const pokemonTypes_Eng=["","dark","rock","psychic","fighting","grass","ice","ghost","ground","electric","poison","dragon","normal","steel","flying","faily","fire","water","bug"];
    // フィルタリングの種類（タイプ・名前・特性などなど） 今後のアップデートで使用可能性あり
                    
    return(
        <div className="filteringContainer">
            <select className='selectType' onChange={func}>
                {pokemonTypes_Eng.map((type,i)=>{
                    return(<option key={type} value={type}>{pokemonTypes_JP[i]} {type}</option>);
                })}
            </select>
        </div>
    );
}


export default Filter;