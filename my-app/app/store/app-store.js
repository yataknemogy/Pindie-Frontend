import { create } from "zustand"
import { setJWT, removeJWT, getJWT, getMyJWT} from "../api/api-utils"
import { endpoints } from "../api/config"

export const useStore = create((set)=>({
    isAuth: false,
    user: null,
    token: null,
    login:(user, token) =>{
        set({ isAuth: true, user, token });
        setJWT(token)
    },
    logout:() =>{
        set({isAuth:false, user:null, token:null });
        removeJWT();
    },
    checkAuth: async () => {
        const jwt = getJWT();
        if (jwt) {
          const user = await getMyJWT(endpoints.me, jwt);
          if (user) {
            set({ isAuth: true, user, token: jwt });
            setJWT(jwt);
          } else {
            set({ isAuth: false, user: null, token: null });
            removeJWT();
          }
        } else {
          set({ isAuth: false, user: null, token: null });
        }
      },
}))