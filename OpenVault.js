var home = document.getElementById("home");
var upload = document.getElementById("upload");
var database = document.getElementById("database");
var moderators = document.getElementById("moderators");
var homeButton = document.getElementById("homeButton");
var uploadButton = document.getElementById("uploadButton");
var databaseButton = document.getElementById("databaseButton");
var adminButton = document.getElementById("adminButton");

function showHome() {
  if (home.style.display !== "block") {
    home.style.display = "block";
    upload.style.display = "none";
    database.style.display = "none";
    moderators.style.display = "none";
    homeButton.style.backgroundColor = "greenyellow";
    uploadButton.style.backgroundColor = "rgb(48, 48, 48)";
    databaseButton.style.backgroundColor = "rgb(48, 48, 48)";
    adminButton.style.backgroundColor = "rgb(48, 48, 48)";
    homeButton.style.color = "black";
    uploadButton.style.color = "white";
    databaseButton.style.color = "white";
    adminButton.style.color = "white";
  };
};

function showUpload() {
  if (upload.style.display !== "block") {
    home.style.display = "none";
    upload.style.display = "block";
    database.style.display = "none";
    moderators.style.display = "none";
    homeButton.style.backgroundColor = "rgb(48, 48, 48)";
    uploadButton.style.backgroundColor = "greenyellow";
    databaseButton.style.backgroundColor = "rgb(48, 48, 48)";
    adminButton.style.backgroundColor = "rgb(48, 48, 48)";
    homeButton.style.color = "white";
    uploadButton.style.color = "black";
    databaseButton.style.color = "white";
    adminButton.style.color = "white";
  };
};

function showDB() {
  if (database.style.display !== "block") {
    home.style.display = "none";
    upload.style.display = "none";
    database.style.display = "block";
    moderators.style.display = "none";
    homeButton.style.backgroundColor = "rgb(48, 48, 48)";
    uploadButton.style.backgroundColor = "rgb(48, 48, 48)";
    databaseButton.style.backgroundColor = "greenyellow";
    adminButton.style.backgroundColor = "rgb(48, 48, 48)";
    homeButton.style.color = "white";
    uploadButton.style.color = "white";
    databaseButton.style.color = "black";
    adminButton.style.color = "white";
  };
};

function showMod() {
  if (moderators.style.display !== "block") {
    home.style.display = "none";
    upload.style.display = "none";
    database.style.display = "none";
    moderators.style.display = "block";
    homeButton.style.backgroundColor = "rgb(48, 48, 48)";
    uploadButton.style.backgroundColor = "rgb(48, 48, 48)";
    databaseButton.style.backgroundColor = "rgb(48, 48, 48)";
    adminButton.style.backgroundColor = "greenyellow";
    homeButton.style.color = "white";
    uploadButton.style.color = "white";
    databaseButton.style.color = "white";
    adminButton.style.color = "black";
  };
};

document.getElementById("header").addEventListener('click', showHome);
document.getElementById("homeButton").addEventListener('click', showHome);
document.getElementById("uploadButton").addEventListener('click', showUpload);
document.getElementById("databaseButton").addEventListener('click', showDB);
document.getElementById("adminButton").addEventListener('click', showMod);

/// Connect to Web3 and MetaMask ///

var web3Check = document.getElementById("web3Check");

if (typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
  try {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    web3Check.innerHTML = "<span>Web3 and MetaMask are working as intended.</span>";
  } catch (e) {
    console.log("Error found." + e);
    web3Check.innerHTML = "<span>Error: Please Ensure MetaMask and Web3 are installed. Please Ensure MetaMask and Web3 are installed. Website features will not be functional until MetaMask is successfully connected.</span>";
    web3Check.style.color = "red";
    document.getElementById("moderators").style.display = "none";
    document.getElementById("adminButton").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("uploadButton").style.display = "none";
    document.getElementById("database").style.display = "none";
    document.getElementById("databaseButton").style.display = "none";
  };
} else {
  web3Check.innerHTML = "<span>Error: Connection to MetaMask failed. Please Ensure MetaMask and Web3 are installed. Website features will not be functional until MetaMask is successfully connected.</span>";
  web3Check.style.color = "red";
  document.getElementById("moderators").style.display = "none";
  document.getElementById("adminButton").style.display = "none";
  document.getElementById("upload").style.display = "none";
  document.getElementById("uploadButton").style.display = "none";
  document.getElementById("database").style.display = "none";
  document.getElementById("databaseButton").style.display = "none";
};

/// MetaMask Accounts ///

if (typeof web3 !== 'undefined') {
  window.ethereum.on('disconnect', function (ProviderRpcError) {
    location.reload();
  });

  window.ethereum.on('accountsChanged', function (accounts) {
    location.reload();
  });

  const accounts = await web3.eth.getAccounts();
  var account = accounts[0];

  /// Initialise Contract ///

  var ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_add",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_res",
          "type": "string"
        }
      ],
      "name": "result",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newMod",
          "type": "address"
        }
      ],
      "name": "addMod",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "filesList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fileName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timeStamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "moderated",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "removalsIndex",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "hash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "fileName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timeStamp",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "tags",
              "type": "string[]"
            },
            {
              "internalType": "bool",
              "name": "moderated",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "removalsIndex",
              "type": "uint256"
            }
          ],
          "internalType": "struct OpenVault.fileRecord[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "index",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "mods",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "modsNum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "removals",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "fileNum",
          "type": "uint256"
        }
      ],
      "name": "rmFile",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fileName",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "tags",
          "type": "string[]"
        }
      ],
      "name": "setData",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  var contractAddress = '0x48f75b4ae22e624def2d8d6f2c13f2a5d4c6767b';

  var token = new web3.eth.Contract(ABI, contractAddress);

  /// Send Data to Contract ///

  const uploadForm = document.getElementById("uploadForm");

  function sendData() {
    var ipfsHash = document.getElementById("ipfsHash").value;
    var fileName = document.getElementById("fileName").value;
    var tags = [];
    if (document.getElementById('politics').checked == true) tags.push("Politics");
    if (document.getElementById('worldAffairs').checked == true) tags.push("World Affairs");
    if (document.getElementById('news').checked == true) tags.push("News");
    if (document.getElementById('images').checked == true) tags.push("Images");
    var result = document.getElementById("result");
    if (ipfsHash.length !== 46) {
      result.innerHTML = "Please enter a valid IPFS Hash.";
    }
    else {
      token.methods.setData(ipfsHash, fileName, tags).send({
        "from": account
      }, function (err, res) {
        if (err) result.innerHTML = "Error. " + err.message;
        else if (res) {
          uploadForm.reset();
          token.events.result(function (err, res) {
            if (!err) {
              result.innerHTML = res.returnValues._res;
            }
          });
        };
      });
    };
  };
  uploadForm.addEventListener('submit', sendData);

  /// Moderating ///

  token.methods.mods(account).call(function (err, res) {
    if (res == false) {
      document.getElementById("moderators").style.display = "none";
      document.getElementById("adminButton").style.display = "none";
    };
  });

  var adminForm = document.getElementById("adminForm");
  function adminFunc() {
    var rmFileResult = document.getElementById("rmFileResult");
    var i = document.getElementById("fileNumber").value;
    token.methods.rmFile(i).send({
      "from": account
    }, function (err, res) {
      if (err) rmFileResult.innerHTML = "Error: " + err.message;
      else if (res) {
        adminForm.reset();
        token.events.result(function (err, res) {
          if (!err) {
            rmFileResult.innerHTML = res.returnValues._res;
          };
        });
      };
    });
  };
  adminForm.addEventListener('submit', adminFunc);

  var newModForm = document.getElementById("newModForm");
  function newModFunc() {
    var newModResult = document.getElementById("newModResult");
    var newMod = document.getElementById("newMod").value;
    token.methods.addMod(newMod).send({
      "from": account
    }, function (err, res) {
      if (err) newModResult.innerHTML = "Error: " + err.message;
      else if (res) {
        newModForm.reset();
        token.events.result(function (err, res) {
          if (!err) {
            newModResult.innerHTML = res.returnValues._res;
          }
        });
      }
    });
  }
  newModForm.addEventListener('submit', newModFunc);

  var removalTemplate = " <div class='pendingRemoval'>\n\
                            <span class='pendingRemovalSpan'>File Number: INDEX</span>\n\
                            <span class='pendingRemovalSpan'>Uploader Address: OWNER</span>\n\
                            <span>IPFS Hash: HASH</span>\n\
                            <button onclick=window.open('https://ipfs.io/ipfs/HASH')>Open</button>\n\
                            <span class='pendingRemovalSpan'>File Name: FILENAME</span>\n\
                          </div><br>"

  token.methods.getData().call(function (err, res) {
    var content = "";
    if (err) content = "<span class='dbEntrySpan'>An error has occured.</span>";
    else if (res) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].removalsIndex > 0 && res[i].moderated == false) {
          var entry = removalTemplate
            .replace(/INDEX/g, res[i].index)
            .replace(/OWNER/g, res[i].owner)
            .replace(/HASH/g, res[i].hash)
            .replace(/FILENAME/g, res[i].fileName)
          content += entry;
        }
      }
      document.getElementById("pendingRemovals").innerHTML = content;
    }
  });

  /// Get Data ///

  var template = "<object class='preview' type='text/html' data='https://ipfs.io/ipfs/HASH'>Unable to Load File</object>\n\
                  <div class='dbEntry'>\n\
                    <span class='dbEntrySpan'>File Number: INDEX.</span>\n\
                    <span class='dbEntrySpan'>Uploader Address: OWNER.</span>\n\
                    <span>IPFS Hash: HASH.</span>\n\
                    <button onclick=window.open('https://ipfs.io/ipfs/HASH')>Open</button>\n\
                    <span class='dbEntrySpan'>File Name: FILENAME.</span>\n\
                    <span class='dbEntrySpan'>Block Timestamp: TIMESTAMP.</span>\n\
                    <span class='dbEntrySpan'>Tags: TAGS.</span>\n\
                  </div><br>";

  var trashTemplate = "<div class='dbTrash'>\n\
                        <span class='dbEntrySpan'>File Number: INDEX.</span>\n\
                        <span class='dbEntrySpan'>Uploader Address: OWNER.</span>\n\
                        <span class='dbEntrySpan'>IPFS Hash: HASH.</span>\n\
                        <span class='dbEntrySpan'>File Name: FILENAME.</span>\n\
                        <span class='dbEntrySpan'>Block Timestamp: TIMESTAMP.</span>\n\
                        <span class='dbEntrySpan'>Tags: TAGS.</span>\n\
                        <span class='dbEntrySpan dbEntryTrash'>Removed by Moderator.</span>\n\
                      </div><br>";

  token.methods.getData().call(function (err, res) {
    var content = "";
    if (err) console.log("An error occured", err);
    for (var i = 0; i < res.length; i++) {
      var timestampMS = res[i].timeStamp * 1000;
      var dateObject = new Date(timestampMS);
      var humanReadabletimestamp = dateObject.toLocaleString();
      if (res[i].moderated == true) var entry = trashTemplate
        .replace(/INDEX/g, res[i].index)
        .replace(/OWNER/g, res[i].owner)
        .replace(/HASH/g, res[i].hash)
        .replace(/FILENAME/g, res[i].fileName)
        .replace(/TIMESTAMP/g, humanReadabletimestamp)
        .replace(/TAGS/g, res[i].tags);
      else var entry = template
        .replace(/INDEX/g, res[i].index)
        .replace(/OWNER/g, res[i].owner)
        .replace(/HASH/g, res[i].hash)
        .replace(/FILENAME/g, res[i].fileName)
        .replace(/TIMESTAMP/g, humanReadabletimestamp)
        .replace(/TAGS/g, res[i].tags);
      content += entry;
    }
    document.getElementById("dbRep").innerHTML = content;
    if (document.getElementById('moderated').checked == true) {
      var all = document.getElementsByClassName('dbTrash');
      for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
      }
    };
  })

  function getSearch() {
    var content = "";
    var search = document.getElementById("searchBar").value;
    var searchTags = [];
    if (document.getElementById('getPolitics').checked == true) searchTags.push("Politics");
    if (document.getElementById('getWorldAffairs').checked == true) searchTags.push("World Affairs");
    if (document.getElementById('getNews').checked == true) searchTags.push("News");
    if (document.getElementById('getImages').checked == true) searchTags.push("Images");
    token.methods.getData().call(function (err, res) {
      if (err) console.log("An error occured", err);
      for (var i = 0; i < res.length; i++) {
        var fn = res[i].fileName;
        var fileTags = res[i].tags;
        if (searchTags.some(r => fileTags.includes(r))) {
          if (search == fn || fn.includes(search) || search == res[i].owner) {
            var timestampMS = res[i].timeStamp * 1000;
            var dateObject = new Date(timestampMS);
            var humanReadabletimestamp = dateObject.toLocaleString();
            if (res[i].moderated == true) var entry = trashTemplate
              .replace(/INDEX/g, res[i].index)
              .replace(/OWNER/g, res[i].owner)
              .replace(/HASH/g, res[i].hash)
              .replace(/FILENAME/g, res[i].fileName)
              .replace(/TIMESTAMP/g, humanReadabletimestamp)
              .replace(/TAGS/g, res[i].tags);
            else var entry = template
              .replace(/INDEX/g, res[i].index)
              .replace(/OWNER/g, res[i].owner)
              .replace(/HASH/g, res[i].hash)
              .replace(/FILENAME/g, res[i].fileName)
              .replace(/TIMESTAMP/g, humanReadabletimestamp)
              .replace(/TAGS/g, res[i].tags);
            content += entry;
          };
        };
      };
      document.getElementById("dbRep").innerHTML = content;
      if (document.getElementById('moderated').checked == true) {
        var all = document.getElementsByClassName('dbTrash');
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        };
      };
    })
  };
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener('submit', getSearch);
};