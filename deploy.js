const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
};

const web3 = new Web3(ganache.provider(), null, OPTIONS);
const { interface, bytecode } = require("./compile");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
};

deploy();
