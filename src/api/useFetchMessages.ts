import artifacts from "../utils/contract.json";
import { domain } from "../utils/EIP712";
import { useEffect } from 'react';
import { useContractRead } from "wagmi";

/* STEP #1
    TODO: Develop the logic to fetch the last 10 messages
    TIP: There is a hook in the Wagmi documentation to call the read-only method
    Link of the documentation: https://wagmi.sh/docs/getting-started
*/
const useFetchMessages = () => {
  const { data, isError, isLoading, refetch } = useContractRead({
    addressOrName: domain.verifyingContract,
    contractInterface: artifacts.abi,
    functionName: 'getLast10Messages',
  });

  useEffect(() => {
    // fetch once (on mount) client-side only 
    refetch();
  }, []);

  return { data, isError, isLoading };

};

export default useFetchMessages;
