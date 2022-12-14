import { useContractWrite, useSignTypedData } from "wagmi";
import artifacts from "../utils/contract.json";
import { domain, types } from "../utils/EIP712";

const WRITE_ASYNC_OVERRIDES_GASLIMIT = { gasLimit: 250_000 };

/* STEP #2
    TODO: Develop the logic to sign typed data with connected account
    TIP: There is a hook in the wagmi documentation to make a 712 signature
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/

/* STEP #3
    TODO: Develop the logic to post a message
    TIP: There is a hook in the wagmi documentation to call the write method
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const usePostMessage = () => {
  const { data, isError, isLoading, isSuccess, error, writeAsync } = useContractWrite({
    addressOrName: domain.verifyingContract,
    contractInterface: artifacts.abi,
    functionName: 'sendMessage',
  });
  const { isError: is712Error, isSuccess: is712Success, error: error712, signTypedDataAsync } = useSignTypedData();

  const postMessage = async (message: string, author: string) => {
    try {
      const value = { contents: message, from: author };
      const signature = await signTypedDataAsync({ value, domain, types });
      const tx = await writeAsync({ args: [message, signature], overrides: WRITE_ASYNC_OVERRIDES_GASLIMIT, });
      console.log(`tx hash: ${tx.hash}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    postMessage,
    data,
    error: error || error712,
    isError: isError || is712Error,
    isLoading: isLoading || isLoading,
    isSuccess: isSuccess && is712Success
  };
};

export default usePostMessage;
