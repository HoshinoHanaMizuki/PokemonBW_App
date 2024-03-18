export const getAllPokemon=(url)=>{
    return new Promise((resolve,reject)=>{
        // 以下が実行されるまで待機（データを指定のURLからフェッチ）
        // フェッチに成功したら、そのデータをjson形式に変換し(then1)、それをdataとして、returnする(then2)
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw new Error("fetch is failed , no data");
            }
            console.log("fetch is successed!",res);
            return res.json();
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((error)=>{reject(error)});
    },
    )
}


export const getPokemon=(url)=>{
    return new Promise((resolve,reject)=>{
        // 以下が実行されるまで待機（データを指定のURLからフェッチ）
        // フェッチに成功したら、そのデータをjson形式に変換し(then1)、それをdataとして、returnする(then2)
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw new Error("fetch is failed , no data");
            }
            console.log("fetch is successed!");
            return res.json();
        })
        .then((data)=>resolve(data))
        .catch((error)=>{reject(error)});
    },
    )
}

