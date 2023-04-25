const queries = {

    //Get Queries
    get_no_of_points_by_action_id:"SELECT NoOfPoints_PerHour FROM EzPark.Point_Details WHERE Action_ID = '?';",
    get_no_of_points_by_user_id:"SELECT UserPoints FROM User_Details WHERE UserID = '?';",
    get_badge_data:"SELECT * FROM Badge_Details;",
    get_discount_by_badge_id:"SELECT * FROM Discounts_Details WHERE BadgeId = '?'",

    //Update Queries
    update_no_of_points_in_user: "UPDATE User_Details SET `UserPoints`='?' WHERE UserID = '?';",
    update_discount_data:""
}

module.exports = queries;