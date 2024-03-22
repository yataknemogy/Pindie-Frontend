import {data} from "../data/data";

export  const getGamesByCategory = (category) => {
      
    return data.filter((game) =>{

        return game.category.find((item)=>{
            return item.name === category;
        })
    })
  }

export const getGamesById = (id) => {
       
    return data.find((item) => item.id === Number(id));
}
