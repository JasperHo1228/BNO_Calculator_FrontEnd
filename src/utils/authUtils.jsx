export const getAuthHeader = () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
  
    if (!email || !password) {
      // If there's no email or password, return null or throw an error
      throw new Error("No email or password found in localStorage");
    }
  
    // Base64 encode the credentials
    const credentials = btoa(`${email}:${password}`);
    console.log(credentials);
    return `Basic ${credentials}`;
  };
  