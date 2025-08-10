namespace BrickStoreBackend.DTO
{
    public class AppointmentResponseDTO
    {
        public long AppointmentId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public string Status { get; set; }
        public double Sqft { get; set; }
        public int Bhk { get; set; }
        public int Floor { get; set; }
        public string LandDescription { get; set; }

        public string EngineerName { get; set; }
        public string UserName { get; set; }
    }
}
