export default function DeliveryForm({ form, handleInputChange }) {
    return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="flex gap-3">
                <input name="firstName" value={form.firstName} onChange={handleInputChange} placeholder="First name" className="border rounded py-1.5 px-3.5 w-full" />
                <input name="lastName" value={form.lastName} onChange={handleInputChange} placeholder="Last name" className="border rounded py-1.5 px-3.5 w-full" />
            </div>
            <input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" className="border rounded py-1.5 px-3.5 w-full" />
            <input name="street" value={form.street} onChange={handleInputChange} placeholder="Street" className="border rounded py-1.5 px-3.5 w-full" />
            <div className="flex gap-3">
                <input name="city" value={form.city} onChange={handleInputChange} placeholder="City" className="border rounded py-1.5 px-3.5 w-full" />
                <input name="state" value={form.state} onChange={handleInputChange} placeholder="State" className="border rounded py-1.5 px-3.5 w-full" />
            </div>
            <div className="flex gap-3">
                <input name="zipcode" value={form.zipcode} onChange={handleInputChange} placeholder="Zipcode" className="border rounded py-1.5 px-3.5 w-full" />
                <input name="country" value={form.country} onChange={handleInputChange} placeholder="Country" className="border rounded py-1.5 px-3.5 w-full" />
            </div>
            <input name="phone" value={form.phone} onChange={handleInputChange} placeholder="Phone" className="border rounded py-1.5 px-3.5 w-full" />
        </div>
    );
}
