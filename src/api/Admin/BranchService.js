import { axiosClient } from '@/api/axiosClient';

const branchService = {
    async changeStatus(branch_id) {
        return await axiosClient.patch(`admin/branches/changeStatus/${branch_id}`);
    }, 
    async store(formData) {
        return await axiosClient.post('admin/branches/store', formData);
    },
};

export default branchService;