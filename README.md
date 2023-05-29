## 📚 MintBoxx - NFT API Documentation

The MintBoxx NFT API enables Web3 developers to build and scale any NFT dapp effortlessly by accessing all the information related to NFTs on the Filecoin network.

### Mainnet

#### 🚀 Get all ERC721 transfers

```
GET /mainnet/ERC721Transfers
```

Returns all ERC721 transfers on the Filecoin Mainnet.

**Example call:** `https://mintboxx.onrender.com/mainnet/ERC721Transfers`

#### 🚀 Get NFTs owned by a user

```
GET /mainnet/ERC721Transfers?owner=0xuseraddress
```

Returns ERC721 transfers owned by the specified user on the Mainnet.

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `owner`   | `address` | User address  |

**Example call:** `https://mintboxx.onrender.com/mainnet/ERC721Transfers?owner=0xuseraddress`

### Hyperspace Testnet

#### 🚀 Get all ERC721 transfers

```
GET /hyperspace/ERC721Transfers
```

Returns all ERC721 transfers on the Filecoin Hyperspace testnet.

**Example call:** `https://mintboxx.onrender.com/hyperspace/ERC721Transfers`

#### 🚀 Get NFTs owned by a user

```
GET /hyperspace/ERC721Transfers?owner=0xuseraddress
```

Returns ERC721 transfers owned by the specified user on the Hyperspace testnet.

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `owner`   | `address` | User address  |

**Example call:** `https://mintboxx.onrender.com/hyperspace/ERC721Transfers?owner=0xuseraddress`

### Calibration Testnet

#### 🚀 Get all ERC721 transfers

```
GET /calibration/ERC721Transfers
```

Returns all ERC721 transfers on the Filecoin Calibration testnet.

**Example call:** `https://mintboxx.onrender.com/calibration/ERC721Transfers`

#### 🚀 Get NFTs owned by a user

```
GET /calibration/ERC721Transfers?owner=0xuseraddress
```

Returns ERC721 transfers owned by the specified user on the Calibration testnet.

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `owner`   | `address` | User address  |

**Example call:** `https://mintboxx.onrender.com/calibration/ERC721Transfers?owner=0xuseraddress`

### Query Parameters

The following query parameters can be used to filter the API results:

- `blockNumber`: Filter by block number.
- `blockHash`: Filter by block hash.
- `tokenAddress`: Filter by token address.
- `owner`: Filter by owner address.

**Note:** Multiple query parameters can be combined to further refine the results.

### 🔍 Sorting

The API supports sorting of results using the `sort` parameter. Multiple fields can be sorted by separating them with commas (`,`).

**Example:** To sort by `blockNumber` in ascending order and `tokenID` in descending order, use `sort=blockNumber,-tokenID`.

### 🎯 Field Selection

The API allows selecting specific fields using the `select` parameter. Multiple fields can be selected by separating them with commas (`,`).

**Example:** To select only the `blockNumber` and `owner` fields, use `select=blockNumber,owner`.

### 📝 Example: Filtering, Sorting, and Field Selection

Suppose you want to fetch ERC721 transfers on the Filecoin Mainnet, filtered by token address, sorted by token ID in descending order, and select only the `blockNumber`,`tokenAddress`, `tokenID`, and `owner` fields. The API call would look like this:

```
GET /mainnet/ERC721Transfers?tokenAddress=0x12345&sort=-tokenID&select=blockNumber,tokenAddress,tokenID,owner
```

This call fetches ERC721 transfers from token address 0x12345 on the Mainnet, sorts them by token ID in descending order, and selects only the `blockNumber`, `tokenAddress`, `tokenID`, and `owner` fields in the response.

---

Feel free to explore the MintBoxx NFT API and leverage its powerful features to build amazing NFT applications on the Filecoin network!
If you have any questions or need assistance with the MintBoxx NFT APIs, please feel free to contact us. We are here to help you!
