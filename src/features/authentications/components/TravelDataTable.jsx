import React from 'react';
import "../../../style/CommonStyle/Table.css";

const TravelDataTable = ({ travelData, onDelete }) => {
    if (!travelData) {
        return null; 
    }

    const userDateCountList = travelData.user_each_travel_day_count_data_list?.user_date_count_list || [];

    return (
        <div className="travel-data-table">
            <h3 className='table-title'>Travel Data 
                <br />
                <>From {travelData.this_year_start_valid_date} to {travelData.this_year_last_valid_date}</>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Days</th>
                        <th>Departure Location</th>
                        <th>Arrival Location</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {userDateCountList.map((eachTravelDay, index) => (
                        <tr key={index}>
                            <td>{eachTravelDay.start_date}</td>
                            <td>{eachTravelDay.end_date}</td>
                            <td>{eachTravelDay.total_day_each_travel}</td>
                            <td>{eachTravelDay.departure_location}</td>
                            <td>{eachTravelDay.arrival_location}</td>
                            <td>
                                <button className="delete-btn" onClick={() => onDelete(eachTravelDay.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div className='travelDataTableResult'>This year has been used <span className='day-text'>{travelData.total_day_each_year}</span> days</div>
        </div>
    );
};

export default TravelDataTable;