import ApiCaller from "./ApiCaller.ts";

type LoginResponse = {
    success: boolean
    error?: string
}
  

export const submitLogin = async (body: {
    name: string,
    email: string,
  }) => {

    const responseBody = await ApiCaller({
      url: `/auth/login`,
      method: 'POST',
      body
    });


    if (responseBody.success && responseBody.data ) {
      
      return {
        success: true
      }
    }
    else {
        return {
            success: false,
            error: 'Failed to login'
        }
    }

  };

export const submitLogout = async () => {
  
    const responseBody = await ApiCaller({
      url: `/auth/logout`,
      method: 'POST',
    });

    if (responseBody.success) {
      return {
        success: true
      }
    }
    else {
        return {
            success: false,
            error: 'Failed to logout'
        }
    }
  };