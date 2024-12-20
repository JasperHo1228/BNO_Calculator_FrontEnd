// TravelDataDetail.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TravelDataTable from '../features/authentications/components/TravelDataTable'; 
import { afterLoginDeleteParamApi } from "../services/ApiServices";
import { getAuthHeader } from "../utils/authUtils";

const TravelDataDetail = () => {
    const location = useLocation();
    const { travelData, updateTravelData } = location.state || {}; 
    const [travelDataState, setTravelDataState] = useState(travelData);  //set the latest travelData

    const handleDelete = async (id) => {
        try {
            const authHeader = getAuthHeader();
            const response = await afterLoginDeleteParamApi(`/delete/travelRecord`, { Authorization: authHeader }, id);
            alert(response); 
    
            
            setTravelDataState((prevData) => {
                // Update local state to remove the deleted item
                const updatedList = prevData.user_each_travel_day_count_data_list.user_date_count_list.filter(item => item.id !== id);
                
                // Calculate new total days
                const newTotalDays = updatedList.reduce((total, travelDay) => total + travelDay.total_day_each_travel, 0);
                
                return {
                    ...prevData,
                    user_each_travel_day_count_data_list: {
                        ...prevData.user_each_travel_day_count_data_list,
                        user_date_count_list: updatedList,
                    },
                    total_day_each_year: newTotalDays 
                };
            });
    
            updateTravelData(prevData => ({
                ...prevData,
            }));
        } catch (error) {
            console.error("Error deleting travel record:", error);
        }
    };

    return (
        <div>
            {travelDataState ? (
                <TravelDataTable 
                    travelData={travelDataState} 
                    onDelete={handleDelete} 
                />
            ) : (
                <p className='text-error'>No travel data available.</p>
            )}
        </div>
    );
};

export default TravelDataDetail;