import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PetShop", () => {
  const INVALID_ID_MSG = "Invalid ID";

  const deployPetshopFixture = async () => {
    const [owner, bob] = await ethers.getSigners();

    const PetShop = await ethers.getContractFactory("PetShop");
    const petShop = await PetShop.deploy();

    return { petShop, owner, bob };
  };

  describe("Deployment", async () => {
    it("Adopting a pet should succeed", async () => {
      const { petShop, bob } = await loadFixture(deployPetshopFixture);

      await expect(petShop.connect(bob).adopt(0)).to.not.be.reverted;
    });

    it("Adopting a pet should fail", async () => {
      const { petShop, bob } = await loadFixture(deployPetshopFixture);
      const invalidId = 16;

      await expect(petShop.connect(bob).adopt(invalidId)).to.be.revertedWith(
        INVALID_ID_MSG
      );
    });

    it("Should get all adopters and check the first", async () => {
      const { petShop, bob } = await loadFixture(deployPetshopFixture);

      await petShop.connect(bob).adopt(0);
      const adopters = await petShop.getAdopters();
      expect(adopters[0]).to.be.equal(bob.address);
    });
  });
});
