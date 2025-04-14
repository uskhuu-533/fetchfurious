import { profileSchema } from "@/app/(profile)/profile/_features/Profile";
import { donationSchema } from "@/app/(viewpage)/viewpage/_features/DonaitionZone";
import { bankCardSchema, passwordSchema } from "@/schema/zodSchema";
import { addDays } from "date-fns";
import axios from "axios";
import { z } from "zod";
export const successMessageSchema = z.object({
  successMessage: z.string(),
});
// const base_url = 'http://localhost:4000'
const base_url = 'https://fetch-furious.onrender.com'
export const postProfile = async (
  values: z.infer<typeof profileSchema>,
  image: string
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const response = await axios.post(
      `${base_url}/profile`,
      {
        avatarImage: image,
        name: values.name,
        about: values.about,
        socialMediaURL: values.socialMediaURL,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async (userId: string | string[]) => {
  try {    
    const response = await axios.get(
      `${base_url}/profile/user/${userId}`,);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getManyProfile = async (page = 1, name: string) => {
  const token = localStorage.getItem(`token`);

  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }

  try {
    const response = await axios.get(`${base_url}/profile/explore`, {
      headers: {
        Authorization: token,
      },
      params: { page, name },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch profiles:`, error);
    return null;
  }
};
export const addBackground = async (
  backgroundImage: string,
  userID: string
) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }
  try {
    await axios.put(
      `${base_url}/profile/backgorund/${userID}`,
      { backgroundImage: backgroundImage },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const sendDonation = async (
  data: z.infer<typeof donationSchema>,
  recipientId: number,
  donorId : number | undefined
) => {

  try {
    const response = await axios.post(
      `${base_url}/donation/${recipientId}/${donorId}`,
      {
        amount: data.amount,
        specialMessage: data.specialMessage,
      },{
        params : {
          recipientId, donorId
        }
      }

    );
    return response    
  } catch (error) {
    console.log(error);
  }
};

export const getQr = async (
  data: z.infer<typeof donationSchema>,
  recipientId: number
) => {
  try {
    const response = await axios.post(
      `${base_url}/qr/${recipientId}`,
      {
        amount: data.amount,
        socialURLOrBuyMeACoffee: data.socialURLOrBuyMeACoffee,
        specialMessage: data.specialMessage,
      },
    );    
    return response
  } catch (error) {
    console.log(error);
  }
};
export const addBankCard = async (value: z.infer<typeof bankCardSchema>) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }

  try {
    await axios.post(
      `${base_url}/bankcard/`,
      {
        country: value.country,
        firstName: value.firstName,
        lastName: value.lastName,
        cardNumber: value.cardNumber,
        expiryDate: `${value.month}/${value.year}`,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getDonation = async (userId: string | string[] | number) => {
  try {
    const response = await axios.get(
      `${base_url}/donation/all/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDonationWithFilter = async (
  userId: string | string[] | number,
  amount: number | null | undefined,
  date: number | string
) => {
  try {
    const response = await axios.get(
      `${base_url}/donation/${userId}`,
      {
        params: {
          amount: amount,
          date: addDays(new Date(), -date).toISOString(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const putProfile = async (
  values: z.infer<typeof profileSchema>,
  image: string
) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }
  try {
    const response = await axios.put(
      `${base_url}/profile`,
      {
        avatarImage: image,
        name: values.name,
        about: values.about,
        socialMediaURL: values.socialMediaURL,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response
  } catch (error) {
    console.log(error);
  }
};
export const putBankCard = async (value: z.infer<typeof bankCardSchema>) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.log(`No token found in localStorage.`);
    return null;
  }

  try {
    const response = await axios.put(
      `${base_url}/bankcard`,
      {
        country: value.country,
        firstName: value.firstName,
        lastName: value.lastName,
        cardNumber: value.cardNumber,
        expiryDate: `${value.month}/${value.year}`,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
return response
  } catch (error) {
    console.log(error);
  }
};
export const putSuccess = async (
  values: z.infer<typeof successMessageSchema>
) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }
  try {
    const response = await axios.put(
      `${base_url}/profile/success`,
      {
        successMessage: values.successMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response
  } catch (error) {
    console.log(error);
  }
};
export const putUser = async (values: z.infer<typeof passwordSchema>) => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }
  try {
    const response = await axios.put(
      `${base_url}/user`,
      {
        password: values.password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
   return response
  } catch (error) {
    console.log(error);
  }
};
export const getUserProfile = async () => {
  const token = localStorage.getItem(`token`);
  if (!token) {
    console.warn(`No token found in localStorage.`);
    return null;
  }
  try {
    const response = await axios.get(`${base_url}/profile/auth`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getBankCard = async () => {
  const token = localStorage.getItem(`token`);
  try {
    const response = await axios.get(`${base_url}/bankcard`, {
      headers: {
        Authorization: token,
      },
    });
    return response
  } catch (error) {
    console.log(error);
  }
}; 

