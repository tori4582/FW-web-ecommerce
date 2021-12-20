import React , {useEffect}from 'react'
import { useDispatch } from 'react-redux'
import * as loginAct from "./Components/redux/actions/loginAct";
import Cookies from "universal-cookie";

const cookie = new Cookies();

export default function InitData() {
    const dispatch = useDispatch();
    useEffect(() => {
        const refreshtoken = cookie.get("refreshtoken");
        if (refreshtoken===undefined) return;
        dispatch(loginAct.postRefreshReport(refreshtoken))
    }, [dispatch])
    return (
        <div>
            
        </div>
    )
}
