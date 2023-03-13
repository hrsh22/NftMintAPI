
# MintBoxx - NFT APIs

The MintBoxx NFT API enables Web3 developers to build and scale any NFT dapp effortlesslyby accessing all the information related to NFTs on Filecoin Virtual Machine.


## NFT API Features

The NFT API provides awesome functionality for the most popular features when working with NFTs, including:

- Fetching NFT transfers
- Fetching NFTs of a owner
- Fetching all NFTs of a collection
- Fetching all Collections
- Fetching NFT metadata ( _... comming soon_ )


## API Reference

#### Get all ERC721 transfers

```http
  GET /api/ERC721Transfers
```

![App Screenshot](https://user-images.githubusercontent.com/59107121/224769589-a93ff4f6-066e-4c0a-b67a-b53f83fb9c90.png)

#### Get NFTs owned by an user

```http
  GET /api/ERC721Transfers?owner=0xuseraddress
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `owner`   | `address` | user address |

#### Get all NFT transfers in a block

```http
  GET /api/ERC721Transfers?blockNumber=blocknumber
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `blocknumber`   | `number` | block number |

#### Get all NFT transfers of a NFT collection

```http
  GET /api/ERC721Transfers?tokenAddress=0xtokenaddress
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tokenAddress`   | `address` | token address |

