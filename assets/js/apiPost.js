

export const apiPost = async(params,options)=>{
    try {
        let response = await fetch(`http://192.168.0.157:3000/users/${params}`,options);
        let json = await response.json();
        return json;
    } catch (error) {
        
    }
    
    
}