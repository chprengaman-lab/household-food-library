//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-qcKWfywR.js
var manifest = { "936741a3d0fed38d0d10f20483bf09b8f5da5c17df8a5cfb744dcee10de09d85": {
	functionName: "callAI_createServerFn_handler",
	importer: () => import("./_ssr/ai-DZcENPjf.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
