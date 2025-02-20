import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://lb.drpc.org/ogrpc?network=berachain&dkey=Avibgvi26EjPsw76UtdwmsTfRDzIsmoR75rjuivZK8k9"
);
const contractAddress = "0x0c49BE0b5DC046B1a68cc64AD0E2dF71B3685610";

const abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
];

const contract = new ethers.Contract(contractAddress, abi, provider);

export async function getNFTs({ walletAddress }: { walletAddress: string }) {
  const ownedNFTs: number[] = [];
  const tokenRange = Array.from({ length: 1532 - 51 }, (_, i) => i + 51); // Create array of token IDs

  // Fire all requests in parallel
  const results = await Promise.allSettled(
    tokenRange.map((tokenId) =>
      contract.ownerOf(tokenId).then((owner) => ({
        tokenId,
        owner,
      }))
    )
  );

  // Process results
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const { tokenId, owner } = result.value;
      if (owner.toLowerCase() === walletAddress.toLowerCase()) {
        ownedNFTs.push(tokenId);
        console.log(`Owns NFT Token ID: ${tokenId}`);
      }
    }
  });

  console.log(`Owned NFTs:`, ownedNFTs);
  return ownedNFTs.sort();
}
