import supabase, { supabaseUrl } from "./supabase";

 export async function login( {email,password}){
   const{data, error}= await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if(error ) throw new Error(error.message);
    return data;
 }

  export async function  getCurrentUser(){
    const{data:session , error}= await supabase.auth.getSession();
    if ( !session.session)return null;
    if(error) throw new Error(error.message)
  }

  export async function signup({ name, email, password, profile_pic }) {
    // Construct a unique file name for the uploaded file
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  
    // Upload the profile picture to the correct bucket
    const { error: storageError } = await supabase.storage
      .from("klimate") // Correct bucket name
      .upload(fileName, profile_pic);
  
    if (storageError) throw new Error(storageError.message);
  
    // Construct the public URL for the uploaded file
    const profilePicUrl = `${supabaseUrl}/storage/v1/object/public/klimate/${fileName}`;
  
    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          profile_pic: profilePicUrl, // Add the uploaded profile picture URL
        },
      },
    });
    console.log("Storage response:", storageError);
    console.log("Auth response:", data, error);
    if (error) throw new Error(error.message);
  
    return data;
  }

  export async function logout() {
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }