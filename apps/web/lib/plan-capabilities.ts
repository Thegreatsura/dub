import { WorkspaceProps } from "@/lib/types";

// Get the capabilities of a workspace based on the plan
export const getPlanCapabilities = (
  plan: WorkspaceProps["plan"] | undefined | string,
) => {
  return {
    canAddFolder: !!plan && !["free"].includes(plan),
    canManageFolderPermissions: !!plan && !["free", "pro"].includes(plan), // default access level is write
    canManageCustomers: !!plan && !["free", "pro"].includes(plan),
    canManageProgram: !!plan && !["free", "pro"].includes(plan),
    canTrackConversions: !!plan && !["free", "pro"].includes(plan),
    canExportAuditLogs: !!plan && ["enterprise"].includes(plan),
    canUseAdvancedRewardLogic:
      !!plan && ["enterprise", "advanced"].includes(plan),
  };
};
