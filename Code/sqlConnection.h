#include <Wt/Dbo/Dbo.h>
#include <Wt/Dbo/backend/MySQL.h>
#include <Wt/Dbo/WtSqlTraits.h>
#include <memory>
#include <string>

namespace S4
{
	void InitializeSession( dbo::Session &session );

	void SetShowQueries(bool show);
}
	
