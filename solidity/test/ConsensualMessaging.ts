import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Encryption", function () {
  var contract: any;

  beforeEach(async function () {
    const ConsensualMessaging = await ethers.getContractFactory(
      "ConsensualMessaging"
    );
    contract = await ConsensualMessaging.deploy(
      "0x20e43cadc9961edfc61170eeef66d571c5993dfc",
      "0xb1766787e2241578c9df8793b7874d3f3d32acd1",
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000",
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
    );
  });

  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, alice, bob] = await ethers.getSigners();

    const ConsensualMessaging = await ethers.getContractFactory(
      "ConsensualMessaging"
    );
    contract = await ConsensualMessaging.deploy(
      "0x20e43cadc9961edfc61170eeef66d571c5993dfc",
      "0xb1766787e2241578c9df8793b7874d3f3d32acd1",
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000",
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
    );

    return { contract, owner, alice, bob };
  }

  it("test double send", async function () {
    const { contract } = await loadFixture(deployContract);

    await contract.submit(
      "0x20e43cadc9961edfc61170eeef66d571c5993dfc",
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
    );
    await expect(
      contract.submit(
        "0x20e43cadc9961edfc61170eeef66d571c5993dfc",
        "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
      )
    ).to.be.revertedWith("Already sent the message");
  });

  it("test match", async function () {
    const { contract, owner, alice, bob } = await loadFixture(deployContract);
    const message =
      "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000";
    await contract.connect(alice).submit(bob, message);

    await expect(contract.connect(bob).submit(alice, message))
      .to.emit(contract, "MatchEvent")
      .withArgs(alice.address, bob.address);
  });
});

// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
