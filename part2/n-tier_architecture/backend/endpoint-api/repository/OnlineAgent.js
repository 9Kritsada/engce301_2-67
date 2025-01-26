const sql = require("mssql");
const sqlConfig = require("../sqlConfig")["development"];

const { v4: uuid } = require("uuid");

console.log("sqlConfig: ", sqlConfig);

async function getOnlineAgentByAgentCode(agentcode) {
  try {
    console.log("agentcode: ", agentcode);

    let pool = await sql.connect(sqlConfig);

    let result = await pool
      .request()
      .query(
        `SELECT * FROM [OnlineAgents] WHERE [agent_code] = '${agentcode}'`
      ); //@agentcode

    console.log("result: ", result);

    if (!result || result.recordsets[0].length === 0) {
      console.log("result: ERROR");
      return {
        error: true,
        statusCode: 404,
        errMessage: "Agent not found",
      };
    } else {
      return {
        error: false,
        statusCode: 200,
        data: result.recordset[0],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

async function createAgent(AgentCode, AgentName, IsLogin, AgentStatus) {
  try {
    console.log("agentcode: ", AgentCode);

    let pool = await sql.connect(sqlConfig);

    let result =
      await pool.query`INSERT INTO [OnlineAgents] (agent_code, AgentName, IsLogin, AgentStatus) VALUES (${AgentCode},${AgentName},${IsLogin},${AgentStatus})`;
    console.log("result: ", result);

    return {
      error: false,
      statusCode: 200,
      data: "Agent was inserted or updated",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

async function updateAgent(AgentCode, AgentName, IsLogin, AgentStatus) {
  try {
    console.log("agentcode: ", AgentCode);

    let pool = await sql.connect(sqlConfig);

    let result =
      await pool.query`UPDATE [OnlineAgents] SET AgentName = ${AgentName}, IsLogin = ${IsLogin}, AgentStatus = ${AgentStatus} WHERE agent_code = ${AgentCode}`;

    console.log("result: ", result);
    return {
      error: false,
      statusCode: 200,
      data: "Agent was inserted or updated",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      statusCode: 500,
      errMessage: "An internal server error occurred",
    };
  }
}

module.exports.OnlineAgentRepo = {
  getOnlineAgentByAgentCode: getOnlineAgentByAgentCode,
  createAgent,
  updateAgent,
};
