import { Asset } from "./asset-model";

export const createAsset = async (data) => {
  const asset = new Asset(data);
  await asset.save();
  return asset;
};

export const assignAsset = async (assetId, employeeId) => {
  const asset = await Asset.findById(assetId);
  if (!asset) throw new Error("Asset not found");
  if (asset.status === "ASSIGNED") throw new Error("Asset already assigned");

  asset.assignedTo = employeeId;
  asset.assignedDate = new Date();
  asset.status = "ASSIGNED";
  await asset.save();
  return asset;
};
export const returnAsset = async (assetId) => {
  const asset = await Asset.findById(assetId);
  if (!asset) throw new Error("Asset not found");

  asset.returnDate = new Date();
  asset.status = "RETURNED";
  asset.assignedTo = null;
  await asset.save();
  return asset;
};
export const getAllAssets = async () => {
  return Asset.find().populate("assignedTo", "firstName lastName email role");
};