import axios from "axios";
import { Redirect } from "react-router";
import { AUTHOR_ID, BASE_URL } from "../constants/app";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { resetAll } from "../store/slices/form";

export const savelist = async (data: any) => {
 
  if(data.id ===""){
    try {
      swal("Lista agregada correctamente!");
      axios.post(`${BASE_URL}?id_author=${AUTHOR_ID}`, data)
    } catch (error) {}
  }else{
    try {
      swal("Lista editada correctamente!");
      axios.put(`${BASE_URL}${data.id}`, data)
    
    } catch (error) {}
    
  }

};

export const deletelist = async (id: any) => {
  try {
    axios.delete(`${BASE_URL}${id}`)
  } catch (error) {}
};

