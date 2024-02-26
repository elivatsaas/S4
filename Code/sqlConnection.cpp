
#include "S4DatabaseClasses.h"
#include "sqlConnection.h"

using namespace std;

static auto mysql = std::make_unique<dbo::backend::MySQL>("S4", "root", "cs386pass", "localhost", 3306, "/tmp/mysql.sock");

	void S4::SetShowQueries(bool show)
	{
		string setting = show ? "true" : "false";
		mysql->setProperty("show-queries", setting);
	}
	
	void S4::InitializeSession( dbo::Session &session )
	{
		session.setConnection(std::move(mysql));
		session.mapClass<Role>("Role");
		session.mapClass<Store>("Store");
		session.mapClass<Employee>("Employee");
		session.mapClass<Shift>("Shift");
		session.mapClass<Schedule>("Schedule");
		session.mapClass<Availability>("Availability");
		session.mapClass<DesiredShiftHours>("DesiredShiftHours");
	}
