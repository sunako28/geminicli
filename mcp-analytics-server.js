// mcp-analytics-server.js
// Google Analytics 4 MCP Server Implementation

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

class GA4MCPServer {
  constructor() {
    // 環境変数から認証情報を取得
    this.propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
    
    if (!this.propertyId) {
      throw new Error('GOOGLE_ANALYTICS_PROPERTY_ID environment variable is required');
    }
    
    // 認証情報の設定
    let credentials;
    if (process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_ANALYTICS_CREDENTIALS);
      } catch (error) {
        throw new Error('Invalid GOOGLE_ANALYTICS_CREDENTIALS JSON format');
      }
    }
    
    // Analytics Data Client の初期化
    this.analyticsClient = new BetaAnalyticsDataClient({
      credentials: credentials
    });
  }
  
  /**
   * 基本的なレポート実行
   */
  async runReport(params) {
    try {
      const [response] = await this.analyticsClient.runReport({
        property: `properties/${this.propertyId}`,
        ...params
      });
      return response;
    } catch (error) {
      console.error('Error running report:', error);
      throw error;
    }
  }
  
  /**
   * ページビュー数を取得
   */
  async getPageViews(startDate, endDate, dimensions = []) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'uniquePageViews' }
      ],
      dimensions: dimensions.map(name => ({ name }))
    };
    
    return await this.runReport(request);
  }
  
  /**
   * アクティブユーザー数を取得
   */
  async getActiveUsers(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'totalUsers' }
      ]
    };
    
    return await this.runReport(request);
  }
  
  /**
   * イベントデータを取得
   */
  async getEvents(startDate, endDate, eventName = null) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'eventCount' }
      ],
      dimensions: [
        { name: 'eventName' }
      ]
    };
    
    // 特定のイベントをフィルタリング
    if (eventName) {
      request.dimensionFilter = {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: eventName
          }
        }
      };
    }
    
    return await this.runReport(request);
  }
  
  /**
   * ユーザー行動指標を取得
   */
  async getUserBehavior(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'sessionsPerUser' },
        { name: 'screenPageViewsPerSession' }
      ]
    };
    
    return await this.runReport(request);
  }
  
  /**
   * デバイス別分析
   */
  async getDeviceAnalysis(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'deviceCategory' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ]
    };
    
    return await this.runReport(request);
  }
  
  /**
   * 流入経路分析
   */
  async getTrafficSources(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'sessionDefaultChannelGroup' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'newUsers' },
        { name: 'totalUsers' }
      ],
      orderBys: [
        { 
          metric: { metricName: 'sessions' }, 
          desc: true 
        }
      ]
    };
    
    return await this.runReport(request);
  }
  
  /**
   * 地域別分析
   */
  async getGeoAnalysis(startDate, endDate, limit = 10) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'country' },
        { name: 'city' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' }
      ],
      orderBys: [
        { 
          metric: { metricName: 'sessions' }, 
          desc: true 
        }
      ],
      limit: limit
    };
    
    return await this.runReport(request);
  }
  
  /**
   * 人気ページ分析
   */
  async getTopPages(startDate, endDate, limit = 10) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' }
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'uniquePageViews' },
        { name: 'averageTimeOnPage' }
      ],
      orderBys: [
        { 
          metric: { metricName: 'screenPageViews' }, 
          desc: true 
        }
      ],
      limit: limit
    };
    
    return await this.runReport(request);
  }
  
  /**
   * コンバージョン分析
   */
  async getConversions(startDate, endDate) {
    const request = {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'conversions' },
        { name: 'totalRevenue' }
      ],
      dimensions: [
        { name: 'eventName' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            value: 'purchase'
          }
        }
      }
    };
    
    return await this.runReport(request);
  }
  
  /**
   * カスタムレポート実行
   */
  async getCustomReport(config) {
    return await this.runReport(config);
  }
}

// MCP サーバーのエクスポート
module.exports = GA4MCPServer;

// CLI実行用
if (require.main === module) {
  const server = new GA4MCPServer();
  
  // テスト実行
  async function test() {
    try {
      console.log('Testing GA4 MCP Server...');
      
      const pageViews = await server.getPageViews('yesterday', 'yesterday');
      console.log('Page Views Test:', pageViews.rowCount);
      
      const activeUsers = await server.getActiveUsers('yesterday', 'yesterday');
      console.log('Active Users Test:', activeUsers.rowCount);
      
      console.log('GA4 MCP Server test completed successfully!');
    } catch (error) {
      console.error('GA4 MCP Server test failed:', error.message);
      process.exit(1);
    }
  }
  
  test();
}
